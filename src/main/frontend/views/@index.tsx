import {ViewConfig} from '@vaadin/hilla-file-router/types.js';
import Paper from '@mui/material/Paper';
import {Box, styled} from "@mui/material";
import Grid from '@mui/material/Grid2';
import MiddlePartView from "Frontend/views/middlepart";
import HomerightView from "Frontend/views/homeright";


/**
 * Home View
 */
export const config: ViewConfig = {
  menu: { order: 0, icon: 'line-awesome/svg/home-solid.svg' },
  title: 'Home',
  loginRequired: true,
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));
export default function HomeView() {
  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1} minHeight={160}>
            {/* Add two grid items */}
            {/* Add grid item: HomeRightView*/}
            <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
            <MiddlePartView></MiddlePartView>
         </Grid>
            {/* Add grid item: HomeRightView*/}
            <Grid display="flex" justifyContent="center" alignItems="center" size="grow">
            <HomerightView></HomerightView>
          </Grid>
        </Grid>
      </Box>
  );
}
