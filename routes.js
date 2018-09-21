

module.exports =  function (waitersFac) {

                    async function show (req,res) {

                        try {
                            res.render('home');

                            let {name} = req.params;
                            //console.log(name);
                            let staffName = await waitersFac.enterWaiterName(name);
                            let all = await waitersFac.getWaiters();

                            let allDay = await waitersFac.getDays();
                            console.log("Names: ", all);
                            console.log("Days:", allDay);
                            
                        } catch (error) {
                            res.redirect("/");
                        }
                    };

                    async function showAdd (req, res) {
                        try {
                          
                            res.render('home');

                        } catch (error) {
                           
                        }
                    };
                    
                    async function admin (req, res)
                    {
                        try {
                            res.render("days");
                        } catch (error) {
                         
                        }
                    };

    
                    return{
                        show,
                        showAdd,
                        admin
                     
                    }
                }