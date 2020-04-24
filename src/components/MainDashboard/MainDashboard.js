// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'


// Internal imports
import MainDashboardRecipeCard from '../MainDashboardRecipeCard/MainDashboardRecipeCard'
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar'
import GroceryList from '../GroceryList/GroceryList'

const MainDashboard = () => {
    const [isLockedButton, setIsLockedButton] = useState('')
    const [recipeIngredientList, setRecipeIngredientList] = useState([])

    const previousWeek = useStoreActions(actions => actions.weeks.previousWeek)
    const nextWeek = useStoreActions(actions => actions.weeks.nextWeek)
    const populateLatestWeek = useStoreActions(actions => actions.weeks.populateLatestWeek)
    const startAddWeek = useStoreActions(actions => actions.weeks.startAddWeek)
    const startAddYear = useStoreActions(actions => actions.weeks.startAddYear)
    const week = useStoreState(state => state.weeks.week)
    const weekGroceries = useStoreState(state => state.weeks.week.groceries, (prev, next) => setLocalWeekGroceries(next))
    const startUpdateWeek = useStoreActions(actions => actions.weeks.startUpdateWeek)
    const addGrocery = useStoreActions(actions => actions.weeks.addGrocery)
    const beginFirstWeek = useStoreActions(actions => actions.weeks.beginFirstWeek)

    const [localWeekGroceries, setLocalWeekGroceries] = useState(weekGroceries)

    const startBeginFirstWeek = () => {
        setIsLockedButton('disabled')
        beginFirstWeek().then(() => {
            setIsLockedButton('')
        })
    }

    const startAddGrocery = (ingredient) => {
        const firstFreeGroceryIndex = week.groceries.findIndex((grocery) => grocery.product === '' && grocery.amount === '')

        console.log(firstFreeGroceryIndex)
        addGrocery({id: week.id, groceryID: firstFreeGroceryIndex, item: ingredient, type: 'RECIPE_INGREDIENT_PRODUCT_ADD'})
    }


    return (
        <div>   
            {week.total !== undefined ? 
                <MainDashboardNavBar 
                    addWeek={() => startAddWeek({year: week.year})} 
                    addYear={() => startAddYear({week})} 
                    startPreviousWeek={() => previousWeek({week})} 
                    startNextWeek={() => nextWeek({week})}
                    week={week}
                />
                :
                null
            }
            {Object.entries(week).length === 0 && week.constructor === Object ? 
            <div>
            <p>No weeks. You should add a week!</p>
            <button disabled={isLockedButton} onClick={startBeginFirstWeek}>Add first week!</button> 
            </div>
            :
            <div className="recipe-list">
            {week.recipes ? week.recipes.map((recipe) => {
                return <MainDashboardRecipeCard key={recipe.day} recipe={recipe.recipeID} day={recipe.day} week={week} onClick={(ingredients) => setRecipeIngredientList(ingredients ? ingredients : [])}/>
            })
            :
            null
            }
            </div>
            }
            <div className="grocery-list-recipe-ingredients-container">
            {
            localWeekGroceries ? 
            localWeekGroceries.length !== 0 ? 
                <GroceryList groceries={localWeekGroceries} week={week}/>
                :
                <h2>Grocery List</h2>
                :
                null
            }
            <div>
            {
                recipeIngredientList.length !== 0 ?
                 <button onClick={() => setRecipeIngredientList([])}>x</button>
                 :
                 null
            }
            {
                recipeIngredientList.length !== 0 ? 
                recipeIngredientList.map((ingredient) => {
                return ( 
                <div key={ingredient} className="recipe-ingredients_ingredient"> 
                    <button onClick={() => startAddGrocery(ingredient)} className="recipe-ingredients_ingredient-add-button">Add</button>
                    <p>{ingredient}</p>
                </div>
                )
                })
                :
                null
            }
            </div>
            </div>
        </div>
    )
}

export default MainDashboard