const cubeModel = require('../models/cube-model');

module.exports = {
    getIndex: (req, res) => {
        const { search, from, to } = req.query;

        if (Object.keys(req.query).length > 0) {
            const filterFn = (item) => {
                let result = true;

                if (search) {
                    result = item.name.toLowerCase().includes(search);
                }

                if (result && from) {
                    result = Number(item.difficultyLevel) >= Number(from);
                }

                if (result && to) {
                    result = Number(item.difficultyLevel) <= Number(to);
                }

                return result;
            };

            cubeModel.find(filterFn).then(cubes => {
                res.render('index', { cubes });
            });
            return;
        }

        cubeModel.getAll().then(cubes => {
            res.render('index', { cubes });
        });
    },
    getAbout: (req, res) => {
        res.render('about');
    },
    getNotFound: (req, res) => {
        res.render('404');
    },
    getCreate: (req, res) => {
        res.render('create');
    },
    postCreate: (req, res) => {
        cubeModel.insert(req.body).then(() => {
            res.redirect('/');
        });
    },
    getDetails: (req, res) => {
        const id = Number(req.params.id);

        cubeModel.getOne(id).then(cube => {
            if (!cube) {
                res.redirect('/not-found');
                return;
            }

            res.render('details', { cube });
        });
    }
};