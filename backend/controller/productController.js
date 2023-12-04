const Ad = require('../models/productModel');


const createAd = async (req, res) => {
  const { name, description, category, image, location, postedAt, price } = req.body;

    try {
        
        const newAd = new Ad({
            name,
            description,
            category,
            image,
            location,
            postedAt,
            price,
            userId: req.user.id,
        });

        await newAd.save();

        res.status(201).json({ message: 'Ad posted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllAd = async (req, res) => {
  const { category, sort, search, page } = req.query;
    const pageSize = 4; 
    let query = {};

    
    if (category) {
        query.category = category;
    }

    if (search) {
        query.name = { $regex: new RegExp(search, 'i') };
    }

    try {
      
        const ads = await Ad.find(query).sort(sort === 'date' ? { postedAt: -1 } : {}).skip((page - 1) * pageSize).limit(pageSize);
        res.json(ads);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getOneAd = async (req, res) => {
  try {
    const ad = await Ad.findById({_id:req.params.Id});
    if (!ad) return res.status(404).json({ message: "No Ad found" });
    res.status(200).json({ ad }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const deleteAd = async (req, res) => {
  try {
    const Ads = await Ad.findByIdAndDelete(req.params.Id);
    if (!Ads) {
      res.status(404).send({ message: 'Ad not found' });
    }
    res.status(200).send({message:"Ad deleted successfully",Ads});
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const updateAd=async(req,res)=>{
  const {Id} = req.params;
  const { name, description, category, image, location, postedAt, price } = req.body;

  try {
     
      const updatedAd = await Ad.findOneAndUpdate(
          { _id: Id},
          { $set: { name, description, category, image, location, postedAt, price } },
          { new: true } 
      );

      if (!updatedAd) {
          return res.status(404).json({ message: 'Ad not found ' });
      }

      res.json({ message: 'Ad updated successfully', updatedAd });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}



module.exports = {
  createAd,
  getAllAd,
  getOneAd,
  deleteAd,
 updateAd
};
