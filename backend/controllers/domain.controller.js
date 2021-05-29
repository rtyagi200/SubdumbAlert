const Domain = require("../models/domainSchema");

exports.addDomainController = async (req, res) => {
    const { domain} = req.body;
    const {userId, username} = req.userData;
    if (!domain) {
        return res.status(200).json({
            success: false,
            message: "Please fill the field"
        });
    }
    try {
        var domainDetails = new Domain({
            domainName: domain,
            userId,
            username
        });
        var result = await domainDetails.save();
        return res.status(201).json({
            success: true,
            message: "New domain saved successfully",
            result: result
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }

}

exports.getDomainController = async (req, res) => {
    try {
        var allDomains = await Domain.find({});
        return res.status(200).json({
            success: true,
            domains: allDomains
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}

exports.editDomainController = async (req, res) => {
    var { editDomainId , domain, editUserId } = req.body;
    if (!editDomainId || !domain) {
        return res.status(200).json({
            success: false,
            message: "Please fill the empty field"
        })
    }
    try {
        if (editUserId === req.userData.userId) {
            updatedDomain = await Domain.findByIdAndUpdate(editDomainId, { domainName: domain });
            return res.status(200).json({
                success: true,
                message: "Domain updated successfully",
                domain: updatedDomain
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Sorry!!! You are not authorized to perform this operation"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}

exports.getEditDomainController = async (req, res) => {
    var {domainId, userId} = req.body;
    if (!domainId) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
    try {
        if (userId === req.userData.userId) {
            var domain = await Domain.findById(domainId);
            return res.status(200).json({
                success: true,
                domain: domain
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Sorry!!! You are not authorized to perform this operation"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}

exports.deleteDomainController = async (req, res) => {
    var {domainId, userId} = req.body;
    if (!domainId) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
    try {
        if (userId === req.userData.userId) {
            var deletedDomain = await Domain.findByIdAndDelete(domainId);
            return res.status(200).json({
                success: true,
                message: "Domain deleted successfully"
            })
        } else {
            return res.status(200).json({
                success: false,
                message: "Sorry!!! You are not authorized to perform this operation"
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later"
        })
    }
}