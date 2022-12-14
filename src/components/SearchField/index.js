import React, {useEffect} from 'react';
import { styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextField as MuiTextField } from '@mui/material';

const Search = styled('div')({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    height: '40px',
})

const TextField = styled(MuiTextField)({
    width: '100%',
})

const SearchField = (props) => {

    const rankList = (search, filteredList, length) => {
        let rankedList = {}, searchLength = search.length;
        
        Object.entries(filteredList).forEach( ([id, dataInfo]) => { // first letter ranking
            let name = dataInfo.name.toLowerCase(), s = search.toLowerCase();

            if(s === name.substring(0, searchLength)) rankedList = {...rankedList, [id]: dataInfo};            
        });
        return {...rankedList, ...filteredList};
    };

    const { data, searchWord, returnList } = props;
    useEffect(() => {
        if(data) {
            let filteredResult = {};
            Object.entries(data).forEach(([id, dataInfo]) => {
                let name = dataInfo.name.toLowerCase(), search = searchWord.toLowerCase();
                if (name.indexOf(search) !== -1) filteredResult = { ...filteredResult, [id]: dataInfo };
            });

            let filteredLength = Object.values(filteredResult).length,
                rankedList = rankList(searchWord, filteredResult, filteredLength);

            returnList(rankedList);
        }
    }, [searchWord]);

    return (
        <Search>
            <TextField 
                id="search"
                label="Search"
                variant="filled"
                value={props.searchWord}
                onChange={props.onChange}
            />
        </Search>
    )
};

export default SearchField;