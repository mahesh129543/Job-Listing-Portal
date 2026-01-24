import {Company} from "../models/company.model.js";

export const cerateCompany=async (req,res)=>{
    try{
        const{name}=req.body;
        if(!name){
            return res.status(400).json({
                message:"Name is required"
         })
        }

        let company= await Company.findOne({name});
        if(company){
            return res.status(400).json({
                message:"Company already exists"
         })
        }

        company=await Company.create({
            name:name,
            userId: req.id  
        });
        res.status(201).json({
            message:"Company registered successfully",
            company:company
        })
    
         
            
       

    }catch(error){
        console.log(error);
    }
}

export const getCompany = async (req, res) => {
    try {
        const companies = await Company.find({ userId: req.id  });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "No companies found",
                success: false
            });
        }

        return res.status(200).json({
            companies,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
            success: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const updateCompany=async (req,res)=>{
        try{
            const{name,description,website,location}=req.body;
            const file=req.file;

            const updateData={name,description,website,location};
            const companyId=req.params.id;
            const company=await Company.findByIdAndUpdate(companyId,updateData,{new:true});
            if(!company){
                return res.status(400).json({
               meassage:"company not found"
            })
            }

            res.status(200).json({
                meassage:"company updated successfully",
                
            })
        }catch(error){
            console.log(error);
        }
}