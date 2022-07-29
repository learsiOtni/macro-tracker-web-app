/*const indexOldElement = selectedCategory.findIndex( ({id}) => id === selectedFood.id);
        if (indexOldElement !== -1) { // if selectedFood already included, update. -1 meands id wasnt found
            selectedCategory = Object.assign([...selectedCategory], {[indexOldElement]: selectedFood});
            console.log(selectedCategory);
        } else { //else normal add
            selectedCategory = [...selectedCategory, selectedFood];
        }*/



    /*getCategoriesFromFirebase = (date = this.state.selectedDate ) => {
        axios.get(`/users/userId/dates/${date}.json`)
            .then( response => {

                let emptyCategories = {}, 
                    updatedFoodQty = this.props.foodBaseValues;

                // Check if categories are empty
                if (!response.data) {
                    emptyCategories = CATEGORIES;
                } else {
                    // Fill out empty categories of firebase
                    Object.entries(CATEGORIES).map( ([key, value]) => {
                        if (!response.data[key]) emptyCategories = { ...emptyCategories, [key]:value };
                    });

                    // Render only the active category
                    let activeCategory = response.data[this.state.activeCategory];
                    activeCategory && Object.entries(activeCategory).map(([foodId, qty]) => {
                        let foodItem = { ...this.props.foodBaseValues[foodId] };
                        updatedFoodQty = {
                            ...updatedFoodQty,
                            [foodId]: updateItemByQty(foodId, foodItem, qty, this.props.foodBaseValues),
                        };
                    });
                };
                
                // update foods from redux
                this.props.onUpdateFoods(updatedFoodQty);

                // update category
                this.setState({ 
                    ...this.state, 
                    showDropdown: false,
                    categories: {
                        ...response.data,
                        ...emptyCategories,
                    },
                });
            })
            .catch( error => {
                console.log(error)
            });
    }*/
    /* END OF DB */


    /*const combinedFoodList = {
            ...this.props.foodLists,
            ...this.props.foodCategories,
        };*/

        /*if(this.props.foodCategories[this.state.activeCategory]) {
            let activeCategory = this.props.foodCategories[this.state.activeCategory],
                updatedFoodQty = {};
            
                console.log(activeCategory);
    
            activeCategory && Object.entries(activeCategory).map(([foodId, qty]) => {
                let foodItem = { ...this.props.foodBaseValues[foodId] };

                updatedFoodQty = {
                    ...updatedFoodQty,
                    [foodId]: updateItemByQty(foodId, foodItem, qty, this.props.foodBaseValues),
                };
            });

            console.log(updatedFoodQty, "HHEEREE");
            // update foods from redux
            //this.props.onUpdateFoods(updatedFoodQty);
        }*/


                /*let emptyCategories = {}, 
                    categories = { breakfast: {}, snacks: {}, lunch: {}, dinner: {} };

                // Check if categories are empty
                if (!response.data) {
                    emptyCategories = categories;
                } else {
                    // Fill out empty categories of firebase
                    Object.entries(categories).map( ([key, value]) => {
                        if (!response.data[key]) emptyCategories = { ...emptyCategories, [key]:value };
                    });
                };

                console.log(categories);*/
                
                //categories = { ...response.data, ...emptyCategories };

                /*if(selectedFood) {
        selectedFood = {...state.foodCategories[category][foodKey]}; 
        qty = selectedFood.qty + 1;
        return {
            ...state,
            foodCategories: {
                ...state.foodCategories,
                [category]: {
                    ...state.foodCategories[category],
                    [foodKey]: updateItemByQty(foodKey, selectedFood, qty, state.foodBaseValues)
                }
            }
        }
    }*/

    /*
    Promise.all(weekPromises).then(() => {
            // Only stores the items that was selected not the whole firebase food data
            let foodsArray = [];
            Object.values(foodWeekLists).map( date => {
                date && Object.values(date).map( category => {
                    category && Object.keys(category).map(foodId => {
                        if (!foodsArray.includes(foodId)) foodsArray.push(foodId);
                    });
                });
            });

            let foodLists = {}, foodPromises = [];
            for (let i = 0; i < foodsArray.length; i++) {
                foodPromises.push(
                    axios.get(`/foods/${foodsArray[i]}.json`)
                        .then(response => {
                            foodLists = {
                                ...foodLists,
                                [foodsArray[i]]: convertItemToFloat(response.data)
                            }
                        })
                );
            };

            Promise.all(foodPromises).then( () => {
                let updatedFoodWeekLists = {...foodWeekLists}, selectedFoods = {...foodLists};

                Object.entries(foodWeekLists).map( ([date, categories]) => {
                    categories && Object.entries(categories).map( ([category, foods]) => {
                        Object.entries(foods).map( ([foodId, qty]) => {
   
                            updatedFoodWeekLists = {
                                ...updatedFoodWeekLists,
                                [date]: {
                                    ...updatedFoodWeekLists[date],
                                    [category]: {
                                        ...updatedFoodWeekLists[date][category],
                                        [foodId]: updateItemByQty(foodId, selectedFoods[foodId], qty, foodLists)
                                    }
                                }
                            }
                        });
                    });
                });

                this.setState({
                    ...this.state,
                    foodLists,
                    foodWeekLists: updatedFoodWeekLists,
                })
            });
        });
    */


        /* HELPERS */
    /*
    //const EVENTS = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"];

    setInputFilter = (element) => {
        EVENTS.map( event => {
            element.addEventListener(event, () => {
                let value = this.state.name.value;
                if(!this.isFloat(value)) {

                    this.setState({ 
                        ...this.state,
                        name: {
                            ...this.state.name,
                            value: ''
                        }
                    });
                };
            });
        });
    };*/