import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Container } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import {v4 as uuidv4} from 'uuid'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LayersClearIcon from '@mui/icons-material/LayersClear';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ListInsideList from './ListInsideList';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ListPage({ selected, deleteL,
  deleteAllElements,
  deleteElement,
addElement}) {
  const [expanded, setExpanded] = React.useState(false);
  const [element, setElement] = React.useState({name:''});

  const handleSubmit = (e) => {
    e.preventDefault();
    element.id = uuidv4();
    addElement(element)
    setElement({name:''})
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    deleteL();
    setElement({name:''})
  }

    return (
        
      <Container>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          selected.icon
        }
        action={
          <IconButton aria-label="delete" onClick={handleDelete } value={selected.id}>
                <DeleteForeverIcon />
          </IconButton>
        }
        
        subheader={selected.date}
      />
          
      <CardContent>
      <Typography variant="h5" gutterBottom component="h2">
        {selected.name ? selected.name.toUpperCase()+':' : '' }
            </Typography>
            <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
            >
              <form onSubmit={handleSubmit}>
               {selected.name !== undefined ? (<TextField value={element.name}
                  onChange={(e) => setElement({ name: e.target.value })}
                  label="List item"
                  id="fullWidth"
                  variant='standard' />) :
                  (<TextField value={element.name}
                    onChange={(e) => setElement({ name: e.target.value })}
                    label="List item"
                    id="fullWidth"
                    variant='standard'
                  disabled/>)}
              {(element.name === '') ? <IconButton disabled type='submit' aria-label="add to favorites" >
          <AddCircleIcon />
            </IconButton> : (<Tooltip title='add new Item'  arrow><IconButton type='submit' aria-label="add to favorites" >
          <AddCircleIcon />
            </IconButton></Tooltip>)}
                  
                
                </form>
    </Box>
      </CardContent>
          <CardActions disableSpacing>
            
            
            <Tooltip title='delete all elements' arrow>
        <IconButton aria-label="delete-all" onClick={deleteAllElements }>
              <LayersClearIcon />
              </IconButton>
              </Tooltip>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
              {(selected.id !== '')?(<ListInsideList list={selected.elements}
                deleteElement={deleteElement}
                element={element}
                setElement={setElement }
                
              />): ''}
        </CardContent>
      </Collapse>
            </Card>
            </Container>
  );
}
