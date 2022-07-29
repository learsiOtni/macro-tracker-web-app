import React, { useRef } from 'react';
import DayPanel from './DayPanel';
import { Grid } from '@mui/material';

const DayPanels = (props) => {

    const activeDayPanel = useRef(null);

    const scrollToModal = () => {
        window.scrollTo({
            top: activeDayPanel.current.offsetTop,
            behavior: 'smooth'
        });
    }

    let activeDate;
    return (
        <Grid container spacing={3}>
            {
                props.week.map( date => {
                    if (date !== props.activeModal) return <Grid item xs={12} md={6} lg={4} key={date}>
                        <DayPanel
                            date={date}
                            foods={props.foodWeekLists[date]}
                            activeModal={date === props.activeModal}
                            openModal={props.openModal.bind(this, date, null)}
                            qtyInputRef={props.qtyInputRef}
                            editMode={props.editMode}
                            inEditMode={props.inEditMode}
                            onRemoveItem={props.onRemoveItem}
                        />
                    </Grid>
                    else activeDate = date
                })
            }

            {/** Render Active Date last for viewing */}
            <div ref={activeDayPanel} />

            {activeDate && <Grid item xs={12} key={activeDate}>
                <DayPanel
                    key={activeDate}
                    date={activeDate}
                    foods={props.foodWeekLists[activeDate]}
                    activeModal={true}
                    openModal={props.openModal.bind(this, activeDate)}
                    qtyInputRef={props.qtyInputRef}
                    editMode={props.editMode}
                    inEditMode={props.inEditMode}
                    onRemoveItem={props.onRemoveItem}
                />
            </Grid>}
            
        </Grid>
    )
}

export default DayPanels;