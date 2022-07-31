import React, { useEffect } from 'react';
import ItemField from './ItemField';
import { Grid, Typography } from '@mui/material';

const ItemFields = React.memo((props) => {

    let itemEntries = [];
    if (props.items) itemEntries = Object.keys(props.items).slice(0, 10).sort();
    
    useEffect( () => {
        console.log('test');
    }, props.showQtyControls);
    
    return (
        <Grid container>
            {itemEntries.length > 0 ?
                itemEntries.map(foodKey => {
                    
                    return <Grid item xs={12} md={6} lg={4} sx={{p: 3}}>
                        <ItemField
                            key={`${props.category}-${foodKey}`}
                            item={props.items[foodKey]}
                            foodKey={foodKey}
                            category={props.category}
                            inputRef={props.inputRef}
                            onAddItem={props.onAddItem}
                            onRemoveItem={props.onRemoveItem}
                            showQtyControls={props.showQtyControls}
                            showRemove={props.showRemove}
                        />
                    </Grid>
                })
                : <Typography variant="body" color="error">No food found!</Typography>
            }
        </Grid>
    )
}, (prevProps, nextProps) => {
    //console.log(nextProps);
    return (prevProps.items === nextProps.items);
});

export default ItemFields;