const Subdomain = require("../models/subdomainSchema");
var pdf = require('pdf-creator-node');
var fs = require('fs');
const path = require('path');

exports.getAllSubdomainsController = async (req, res) => {
    try {
        var searchedDomain = req.query.q;
        if(searchedDomain){
            var allSubdomains = await Subdomain.find({domainName: {$regex: searchedDomain, $options: '$i'}});
        }else{
            var allSubdomains = await Subdomain.find({});
        }
        return res.status(200).json({
            success: true,
            subdomains: allSubdomains
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}


exports.addData = async (req, res) => {
    const { domain, subdomains, todaySubdomains, } = req.body;
    if (!domain || !subdomains || !todaySubdomains) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        });
    }
    try {
        var domainDetails = new Subdomain({
            domainName: domain,
            subdomains,
            newSubdomains: todaySubdomains
        });
        var result = await domainDetails.save();
        return res.status(201).json({
            success: true,
            message: "New domain added successfully",
            result: result
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }

}

exports.createPDF = (req, res) => {
    var { domain, subdomains } = req.body;
    var date = new Date();
    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm",
        contents: {
            "border": "1px solid black"
        }
    }
    let htmlData = fs.readFileSync("./template/pdfTemplate.html", "utf-8");
    let document = {
        html: htmlData,
        data: {
            domain: domain,
            subdomains: subdomains,
            date: `${date.toDateString()} ${date.toLocaleTimeString()}`,
            username: req.userData.username
        },
        path: './generatedPDFs/subdomains.pdf',
        type: ""
    };
    pdf
        .create(document, options)
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "PDF generated successfully"
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: true,
                message: "PDF generation failed"
            });
        });
}

exports.fetchPDF = async (req,res) => {
    try{
        const filePath = path.join(__dirname, '../generatedPDFs/subdomains.pdf');
        res.status(200).sendFile(filePath);
    } catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
   
}