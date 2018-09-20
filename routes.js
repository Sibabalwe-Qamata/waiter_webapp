module.exports =  function (regNumbers) {

                    async function show (req,res) {

                        try {
                            let normalList = await regNumbers.getPlate();
                            let displayRegs = normalList.reverse();

                            let drop_down = await regNumbers.dropDown();
                            res.render('home', {
                                displayRegs,
                                drop_down
                            });
                        } catch (error) {
                            res.redirect("/");
                        }

                    };

                    async function showAdd (req, res, next) {
                        try {
                            let {
                                regValue
                            } = req.body;
                            let result = await regNumbers.enterRegPlate(regValue);

                            if (result.success === true) {
                                req.flash('info', result.message);
                                res.redirect("/");
                            } else if (result.success === false) {

                                req.flash('error', result.message);
                                res.redirect("/");
                            }


                        } catch (error) {
                            next(error);
                        }
                    };
                    
                    async function filter (req, res)
                    {
                        try {
                            let {
                                townTag
                            } = req.params;
                            let displayRegs = await regNumbers.filterTown(townTag);
                            let drop_down = await regNumbers.dropDown(townTag);


                            res.render("home", {
                                displayRegs,
                                drop_down
                            });


                        } catch (error) {
                            res.redirect("/");
                        }
                    };

                    async function reset(req, res) {
                        try {
                            await regNumbers.resetDataBase();
                            req.flash('info', 'The database has just been cleared!');
                            res.redirect("/");
                        } catch (error) {
                            res.redirect("/");
                        }
                    };


                    return{
                        show,
                        showAdd,
                        filter,
                        reset
                    }
                }