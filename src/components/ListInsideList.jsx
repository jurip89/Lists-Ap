import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ClearIcon from '@mui/icons-material/Clear';

export default function ListInsideList({
  list,
  deleteElement,
 
}) {
  const [checked, setChecked] = React.useState([0]);

  const handleDelete = (x) => {
    
    deleteElement(x)
  }
 
  

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const displayList = list ? list : []
  return (

    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {displayList.map((value,i) => {
        const labelId = `checkbox-list-label-${value.name}-${i}`;

        return (
          <ListItem
            key={`${value.name}-${i}`}
            secondaryAction={
              <IconButton edge="end" aria-label="delete this item"  onClick={()=>handleDelete(value)}>
                {(checked.indexOf(value) !== -1)?<ThumbUpIcon /> : <ClearIcon/>}
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.name} sx={(checked.indexOf(value) !== -1)? {textDecoration:'line-through'} :{} }/>
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
