import React, {Component} from 'react';
import { render } from 'react-dom';
import Aux from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary' ;


const PRICES= {
    cheese: 3,
    meat: 3,
    bacon: 2,
    salad: 1
};

class BurgerBuilder extends Component{




    state = {
        ingredients:{
            cheese: 0,
            meat: 0,
            bacon: 0,
            salad: 0,
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    };

    updatePurchaseState = (ingredients) =>{

        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el
        }, 0);

        this.setState({purchasable: sum>0})
    }

    purchaseHandler = () =>{
        this.setState({
            purchasing: true
        });
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount= oldCount + 1;
        const updatedIngredients={
         ...this.state.ingredients
        }

        updatedIngredients[type]= updatedCount;
        const oldPrice=this.state.totalPrice;
        console.log(PRICES[type])
        const newPrice= oldPrice + PRICES[type];

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return
        }
        const updatedCount= oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
           }
        updatedIngredients[type]= updatedCount;
        const oldPrice=this.state.totalPrice;
        const newPrice= oldPrice - PRICES[type];
           
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients   
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseCancelHandler = () =>{
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () =>{
        this.setState({
            purchasing: true
        })
    }


 render(){
     const disabledInfo = {
        ...this.state.ingredients
     };

     for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
    
     }


     return(
        <Aux>
           <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary price={this.state.totalPrice} ingredients={this.state.ingredients} cancel={this.purchaseCancelHandler} continue={this.purchaseContinueHandler}/>
            </Modal>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
            />
        </Aux>
     );
 }
}

export default BurgerBuilder;