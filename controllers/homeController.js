const homeController = (req, res) =>{
    res.render('index.ejs')
}

const AnalyseController = (req, res) =>{
    res.render('analyse.ejs')
}

const Roadmap = (req, res) =>{
    res.render('tree1/index.ejs')
}

const AnalyseUsingAptitude = (req, res) =>{
    res.render('analyse/aptitudepage1.ejs')
}

const AnalyseUsingInterest = (req, res) =>{
    res.render('analyse/Interest1.ejs')
}

const ChatBot = (req, res) =>{
    res.render('ChatBot/index.ejs')
}


module.exports = { homeController, AnalyseController, Roadmap, AnalyseUsingAptitude, AnalyseUsingInterest, ChatBot } 