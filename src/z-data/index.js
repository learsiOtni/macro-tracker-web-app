import React, { Component } from 'react';
import axios from '../../axios/axios-foods';
import data from './data.txt'
import data2 from './data2.txt';


class Home extends Component {

    state = {
        showDate: true,
        foods: null,
    };

    dateHandler = () => {
        this.setState({ showDate: !this.state.showDate});
    };

    readTextFile = file => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = () => {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status == 0) {
                    let allText = rawFile.responseText;
                    let foods = {};
                    let foodKey = 0;

                    allText.split(/\r\n|\n/).map( data => {
                        let macros = data.replace(/	/g , "-").split('-');
                        //calories, protein, carbs sugar, fat,saturates,fibre,salt
                        let key = ['null', 'calories', 'protein', 'carbs', 'sugar', 'fat', 'saturates', 'fibre', 'salt'];
                        
                        for (let i = 1; i < macros.length; i++) {
                            foods = { 
                                ...foods, 
                                [foodKey]: {
                                    ...foods[foodKey],
                                    [key[i]]: macros[i]
                                }
                            };
                        };
                        
                        let headerKey = ['name', 'unitValue', 'unit'];
                        let heading = macros[0].split(/(-?\d*[.]?\d+)/);
                        //let heading = macros[0].split(/(-?\d*[.,]?\d*)/);

                        headerKey.map( (item, index) => {
                            foods = {
                                ...foods,
                                [foodKey]: {
                                    ...foods[foodKey],
                                    [item]: heading[index].trim()
                                }
                            }
                        });

                        foods = {...foods, 
                            [foodKey]: 
                                {...foods[foodKey], qty: 1}
                        }

                        //let title = heading[0];
                        //let unitValue = heading[1];
                        //let unit = heading[2];
                        //console.log(title,'-', unitValue,'-', unit);
                        foodKey += 1;
                    });
                    this.setState({
                        foods: foods,
                    })
                }
            }
        };
        rawFile.send(null);
    };

    componentDidMount() {
        this.readTextFile(data2);
        
    }

    addToDb = () => {

        Object.values(this.state.foods).map( object => {
            axios.post('foods.json', object) //?auth=${this.props.token}` add token
                .then( response => {
                    console.log(response);
                })
        })
    }

    render() {

        console.log(this.state.foods);
        return (
            <div>
                <p>HomeScreen</p>

                {this.state.foods && <button onClick={this.addToDb}>ADD TO DB</button>}

                <p>Show what meals is for today</p>
                <p>Lunch: PEanut butter: 1, Egg: 2</p>

                <p>maybe add datepicker</p>
                <p>to show what meal is next day etc...</p>
            </div>
        );
    };
};

export default Home;