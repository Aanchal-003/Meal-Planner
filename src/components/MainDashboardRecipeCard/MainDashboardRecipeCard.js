// External imports
import React from 'react'
import { Link } from 'react-router-dom'


const MainDashboardRecipeCard = ({ recipe, day, week }) => {
    return (    
        <div>
            {recipe === "" ? 
            <div className="main-dashboard-recipe-card">
                <div className="main-dashboard-recipe-card__container">
                        <h4>{day}</h4>  
                        <Link to={`/recipe-picker/${week.id}/${day}`} day={day}><p>Add recipe</p></Link>
                </div>
            </div>    
            :
            <div className="main-dashboard-recipe-card">
                <div className="main-dashboard-recipe-card__container">
                        <h4>{day}</h4>  
                        <Link to={`/recipe-picker/${week.id}/${day}`} day={day}><p>{recipe.name}</p></Link>
                </div>
            </div> 
            }

        </div>
    )
}

export default MainDashboardRecipeCard