import React from 'react';
import { connect } from 'react-redux';
import { addQty, subQty, changeQty, editQty, addRemoveFav } from '../../store/actions';

import { styled, Typography, Box, Button, IconButton, TextField, Card} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const Div = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const FavIcon = styled('div', {
    shouldForwardProp: props => props !== 'isFav'
})(({isFav}) => ({
    color: isFav ? 'red' : 'grey',
    cursor: 'pointer',
    '&:hover': {
        opacity: '0.5',
        color: !isFav && 'red'
    }
}))

const Input = styled('input', {

})({
    border: 'none',
    width: '30px',
    fontSize: '16px',
})

const ItemField = (props) => {

    /* VARS */
    let foodId = `${props.category} ${props.foodKey}`; //space since _ is used in id generator in firebase
    let isActive = props.activeFood === foodId,
        isFav = props.favs && props.favs[props.foodKey],
        inputRef;

    if (isActive) {
        inputRef = props.inputRef;
    };

    const inputHandler = (event) => props.changeQty(foodId, event.target.value);
    const favHandler = () => props.addRemoveFav(props.userId, props.token, props.foodKey);
    

    const { name, unitValue, unit, calories, protein, carbs, fat, qty } = props.item;
    console.log(name, props.showQtyControls, props.showRemove)
    return (
        <Card variant="outlined" sx={{ p: 1}}>

            <Div sx={{ justifyContent: 'space-between', mb: 2, borderBottom: '1px solid grey' }}>
                <Div>
                    <Typography component="h4" variant="h6">{name}</Typography>
                    <Typography variant="subtitle2" sx={{ ml: 2 }}>({unitValue.toFixed(0)}{unit})</Typography>
                </Div>

                <FavIcon onClick={favHandler} isFav={isFav}>
                    <FavoriteIcon/>
                </FavIcon>
            </Div>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, textAlign: 'center' }}>
                <div>
                    <Typography>{calories.toFixed(2)}</Typography>
                    <Typography variant="body2">kcals</Typography>
                </div>

                <div>
                    <Typography>{protein.toFixed(2)}</Typography>
                    <Typography variant="subtitle2">protein</Typography>
                </div>

                <div>
                    <Typography>{carbs.toFixed(2)}</Typography>
                    <Typography variant="subtitle2">carbs</Typography>
                </div>

                <div>
                    <Typography>{fat.toFixed(2)}</Typography>
                    <Typography variant="subtitle2">fat</Typography>
                </div>
            </Box>

            <Div sx={{borderTop: '1px solid grey', display: 'flex', justifyContent: 'space-between'}}>

                {props.showQtyControls && <div>
                    <IconButton onClick={props.subQty.bind(this, foodId)}><RemoveIcon /></IconButton>
                    <IconButton onClick={props.addQty.bind(this, foodId)}><AddIcon /></IconButton>
                </div>}


                <Typography component="span" variant="body2" sx={{ml: 2, mr: 1}}>QTY:</Typography>
                <Input
                    ref={inputRef}
                    disabled={!isActive}
                    onChange={inputHandler}
                    value={qty}
                />

                { props.showQtyControls && <Button
                    onClick={props.editQty.bind(this, foodId)}
                    size="small"
                >
                    {isActive ? <SaveIcon sx={{mr: 0.5, fontSize: '18px'}}/> : <EditIcon sx={{mr: 0.5, fontSize: '18px'}}/> }
                    {isActive ? 'SAVE' : 'EDIT'}
                </Button> }

                {props.showQtyControls && props.showRemove ? (
                    <Button size="small" onClick={props.onRemoveItem.bind(this, foodId)}>Remove</Button>
                ) : (
                    <Button size="small" onClick={(props.onAddItem.bind(this, props.foodKey))}>Add to {props.category}</Button>
                )}
            </Div>

        </Card>
    )
};

const mapStateToProps = ({ auth, fav, foods }) => ({
    userId: auth.userId,
    token: auth.token,
    favs: fav.favs,
    activeFood: foods.activeFood,
});

const mapDispatchToProps = { addQty, subQty, changeQty, editQty, addRemoveFav };

export default connect(mapStateToProps, mapDispatchToProps)(ItemField);