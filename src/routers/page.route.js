import { Router } from "express";
import orderModel from "../models/order.model.js";
import categoryModel from "../models/category.model.js";
import clothesModel from "../models/clothes.model.js";

const pageRouter = Router();

pageRouter.get("/", async (req, res) => {
  const { category = "all" } = req.query;

  // Faqat top-level kategoriyalarni olish (categoryId: null)
  const topLevelCategories = await categoryModel.find({ categoryId: null }).populate("children");
  const clothes = await clothesModel.find();

  // Top-level kategoriyalarga id maydonini qo'shish
  const formattedTopLevelCategories = topLevelCategories.map(cat => ({
      ...cat._doc,
      id: cat._id.toString(),
  }));

  // Agar "All" kategoriyasi topilmasa, default holat
  let categoryRes = formattedTopLevelCategories;
  if (!categoryRes.find(cat => cat.name === "All")) {
      categoryRes = [
          { id: "all", name: "All", clothes, isActive: true },
          ...formattedTopLevelCategories
      ];
  }

  let clothesRes = clothes;

  // Faol kategoriyani topish
  categoryRes.forEach((r) => {
    if (r.id == category) {
      r.isActive = true;
      clothesRes = r.clothes || clothes; // Agar clothes bo'lmasa, umumiy clothes ni ishlatamiz
    } else {
      r.isActive = false;
    }
  });

  // Faol kategoriyani topib, categoryName ni aniqlash
  const activeCategory = categoryRes.find((cat) => cat.isActive);
  const categoryName = activeCategory ? activeCategory.name : "Noma'lum";

  // subcategories sifatida faol kategoriyaning children maydonini ishlatamiz
  let subcategories = activeCategory && activeCategory.children ? activeCategory.children : [];

  // Agar "All" faol bo'lsa, subkategoriyalarni top-level kategoriyalardan olish
  if (categoryName === "All") {
      subcategories = formattedTopLevelCategories.filter(cat => cat.name !== "All");
  }

  // Subkategoriyalarga id maydonini qo'shish
  const formattedSubcategories = subcategories.map(sub => ({
      ...sub._doc || sub, // Agar subkategoriya Mongoose ob'ekti bo'lmasa, to'g'ridan-to'g'ri ishlatamiz
      id: sub._id ? sub._id.toString() : sub.id,
  }));

  // categoryRes va subcategories ni konsolga chiqarish
  // console.log("CategoryRes after formatting:", categoryRes);
  // console.log("Formatted Subcategories:", formattedSubcategories);

  res.render("index", {
      categories: categoryRes,
      clothes: clothesRes,
      categoryName,
      subcategories: formattedSubcategories,
  });
});


pageRouter.get("/users/login", (req, res) => {
  res.render("auth/login", { error: null });
});

pageRouter.get("/users/register", (req, res) => {
  res.render("auth/register", { error: null });
});

pageRouter.get("/users/forgot-password", (req, res) => {
  res.render("auth/forgot-password", { error: null, message: null });
});

pageRouter.get("/users/reset-password", (req, res) => {
  const token = req.query.token;
  if (!token) {
    res.redirect("/users/login");
  }
  res.render("auth/reset-password", {
    error: null,
    message: null,
    token,
  });
});

pageRouter.get("/categories", (req, res) => {
  res.render("categories/index")
});

pageRouter.get("/categories/show", (req, res) => {
    res.render("categories/show")
});

pageRouter.get("/categories/create", (req, res) => {
    res.render("categories/create")
});

pageRouter.get("/categories/edit", (req, res) => {
    res.render("categories/edit")
});

pageRouter.get("/orders", async (req, res, next) => {
      res.render("orders/index", { orders });
})

pageRouter.get("/orders/create", async (req, res, next) => { 
      res.render("orders/create", { clothes });
})
  
  pageRouter.get("/orders/:id", async (req, res) => {
    const { id } = req.params;
    
    try {
      const order = await orderModel.findById(id).populate("items.product");
      if (!order) {
        return res.status(404).render("orders/show", {
          order: null, 
          error: "Buyurtma topilmadi",
          success: null,
        });
      }

  
      res.render("orders/show", {
        order,
        error: null,
        success: null,
      });
    } catch (err) {
      console.error(err);
      res.status(500).render("orders/show", {
        order: null, 
        error: "Xatolik yuz berdi", 
        success: null,
      });
    }
  });

export default pageRouter;
