import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import {AutoSizer, List} from 'react-virtualized';
import 'react-virtualized/styles.css';

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

export default function VirtualizedList() {
  return (      
        <AutoSizer>
    {({height, width}) => (
      <List
        height={height}
        rowCount={10}
        rowHeight={20}
        rowRenderer={renderRow}
        width={width}
      />
    )}
  </AutoSizer>
  );
}
