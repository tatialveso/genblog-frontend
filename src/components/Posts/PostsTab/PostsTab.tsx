import React, {useState} from 'react';
import { AppBar, Tab, Tabs, Typography, Box } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import PostsList from '../PostsList/PostsList';
import './PostsTab.css';

function PostsTab() {
    const [value, setValue] = useState('1');

    function handleChange(event: React.ChangeEvent<{}>, newValue: string){
        setValue(newValue);
    }
  return (
    <>
      <TabContext value={value}>
        <AppBar position="static" className="homeTab">
          <Tabs className="button" centered onChange={handleChange}>
            <Tab label="Visualizar as postagens" value="1"/>
            <Tab label="Sobre o blog" value="2" />
          </Tabs>
        </AppBar>
        <TabPanel value="1">
          <Box>
            <PostsList />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Typography variant="h5" gutterBottom component="h5" className="aboutTitle">Sobre o blog</Typography>
          <Typography variant="body1" gutterBottom className="aboutText">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos ut eveniet natus totam et, voluptate dicta tempore alias, odio nobis non eius cupiditate minima inventore pariatur! Ipsum itaque consectetur voluptatibus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo velit consequuntur suscipit fugiat, nam quis quod quaerat veritatis et, vel ratione beatae, facere neque! Quo animi porro voluptate saepe deleniti? Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore adipisci, officia aut quidem dolorum deserunt iure dolorem doloribus velit nobis quas consequatur at ullam odit, nesciunt est nulla nihil excepturi!</Typography>
        </TabPanel>
      </TabContext>
    </>
  );
}
export default PostsTab;