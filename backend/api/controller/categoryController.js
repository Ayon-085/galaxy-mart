const categoryModel = require('../model/categoryModel');
const slugify = require('slugify');
const shortid = require('shortid');

const categoriesList = (categories, parentId=null)=>{
  const categoryList = [];
  let category;
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined);
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      categoryImage: cat.categoryImage,
      parentId: cat.parentId,
      type: cat.type,
      children: categoriesList(categories, cat._id),
    });
  }

  return categoryList;
};

const createCategory = async (req, res)=>{
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`,
        createdBy: req.user_id,
    };

    let image = req.file.filename;
    categoryObj.categoryImage = image;


    if(req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const category = new categoryModel(categoryObj);

    await category.save((err, category)=>{
        if(err) res.status(400).json({ Error: err });
        if(category) res.status(201).json({ category });
    });
};

const getCategories = async (req, res)=>{
    categoryModel.find({}).exec((error, categories)=>{
      if(error) res.status(400).json({ Error: error});
      if(categories){
        const category = categoriesList(categories);
        res.status(201).json({category}); 
      }
    });
};


const updateCategories = async (req, res) => {
  try{
    const name  = req.body.name;
    const _id = req.params.id;
    console.log(_id);
    const category = await categoryModel.findById(_id);
    console.log(category);
    if(category){
      category.name = name;
      category.slug = slugify(name);
    }

    let image = req.file.filename;
    category.image = image;
    await category.save();
    res.status(201).json({ category: category});

  
  } catch(error){
      res.status(404).json({messages: error});
  }
};

const deleteCategories = async (req, res)=>{
  try{
    const _id = req.params.id;
    const category = categoryModel.findById(_id);
    const deleteCategory = await categoryModel.findOneAndDelete(category);
    res.status(201).json({message: "category deletion successful! " });
  } catch(error){
    res.status(400).json({message: error});
  }
};


module.exports = {createCategory, getCategories, updateCategories, deleteCategories};


//module.exports = {getCategories, createCategory, deleteCategory, updateCategory};