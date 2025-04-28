const getHomePage = (req, res) => {
    res.render('home.ejs', { title: 'Home Page' });
}

const getSample = (req, res) => {
    res.render('sample.ejs', { title: 'Sample Page' });
}

const postSample = (req, res) => {
    console.log(req.body);
    res.render('sample.ejs', { title: 'Sample Page', data: req.body });
}

module.exports = {
    getHomePage, getSample, postSample
}