const FoodItem = require('../models/FoodItem');

const VALID_CATEGORIES = ['Starters', 'Main Course', 'Desserts', 'Beverages'];

const normalizeBody = (body) => ({
  name: String(body.name || '').trim(),
  description: String(body.description || '').trim(),
  category: String(body.category || '').trim(),
  price: Number(body.price),
  available: body.available === undefined ? true : body.available === 'true' || body.available === true,
  featured: body.featured === undefined ? false : body.featured === 'true' || body.featured === true,
  discountPercent: Number(body.discountPercent || 0)
});

const validatePrice = (payload) => {
  if (!payload.name || Number.isNaN(payload.price) || payload.price <= 0) {
    return 'Name and valid price are required';
  }
  if (payload.featured && payload.price <= 100) {
    return 'Featured items must be priced above 100 INR';
  }
  return null;
};

exports.getAllFoodItems = async (req, res) => {
  try {
    const { search = '', category = '', available = '', featured = '', minPrice = '', maxPrice = '', minRating = '' } = req.query;
    const query = {};

    if (search.trim()) {
      query.name = { $regex: search.trim(), $options: 'i' };
    }
    if (category.trim()) {
      query.category = category.trim();
    }
    if (available === 'true' || available === 'false') {
      query.available = available === 'true';
    }
    if (featured === 'true' || featured === 'false') {
      query.featured = featured === 'true';
    }
    if (minPrice !== '' || maxPrice !== '') {
      query.price = {};
      if (minPrice !== '' && !Number.isNaN(Number(minPrice))) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== '' && !Number.isNaN(Number(maxPrice))) {
        query.price.$lte = Number(maxPrice);
      }
    }
    if (minRating !== '' && !Number.isNaN(Number(minRating))) {
      query.ratingAverage = { $gte: Number(minRating) };
    }

    const foods = await FoodItem.find(query).sort({ createdAt: -1 });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch food items' });
  }
};

exports.createFoodItem = async (req, res) => {
  try {
    const payload = normalizeBody(req.body);
    const priceError = validatePrice(payload);
    if (priceError) {
      return res.status(400).json({ error: priceError });
    }
    if (!VALID_CATEGORIES.includes(payload.category)) {
      return res.status(400).json({ error: 'Invalid category selected' });
    }

    const image = req.file ? `/uploads/${req.file.filename}` : String(req.body.image || '').trim();

    const created = await FoodItem.create({
      ...payload,
      image
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food item' });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const payload = normalizeBody(req.body);
    const priceError = validatePrice(payload);
    if (priceError) {
      return res.status(400).json({ error: priceError });
    }
    if (!VALID_CATEGORIES.includes(payload.category)) {
      return res.status(400).json({ error: 'Invalid category selected' });
    }

    const updates = {
      ...payload
    };

    if (req.file) {
      updates.image = `/uploads/${req.file.filename}`;
    } else if (req.body.image !== undefined) {
      updates.image = String(req.body.image || '').trim();
    }

    const updated = await FoodItem.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food item' });
  }
};

exports.addFoodReview = async (req, res) => {
  try {
    const { userName, rating, comment } = req.body;
    const item = await FoodItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Food item not found' });
    }

    const safeRating = Number(rating);
    if (Number.isNaN(safeRating) || safeRating < 1 || safeRating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    item.reviews.push({
      userName: String(userName || req.user?.name || 'Guest').trim(),
      rating: safeRating,
      comment: String(comment || '').trim()
    });

    item.ratingCount = item.reviews.length;
    item.ratingAverage = Number(
      (item.reviews.reduce((sum, review) => sum + review.rating, 0) / Math.max(1, item.ratingCount)).toFixed(1)
    );

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit review' });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    const deleted = await FoodItem.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    res.json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food item' });
  }
};
