import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaystation } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      maxWidth: 345,
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }),
);

interface IExpandableCard {
  title: string;
  subtitle: string;
  notify: () => void;
}

export default function ExpandableCard(props: IExpandableCard) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <FontAwesomeIcon size="2x" icon={faPlaystation} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.title}
        subheader={props.subtitle}
      />
      <CardMedia
        className={classes.media}
        image="https://image.jeuxvideo.com/images-sm/p3/f/o/folkp30f.jpg"
        title={props.title}
      />
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
      </CardContent> */}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={() => {
          const remote = require('electron').ipcRenderer;
          remote.send('launch-game', ["game=folklore", "emulator=rpcs3"]);
        }} aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show description"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse onEntering={() => props.notify()} onEntered={() => props.notify()} onExiting={() => props.notify()} onExited={() => props.notify()} in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            Folklore, known in Japan as FolksSoul -Ushinawareta Denshō- (FolksSoul -失われた伝承- FōkusuSōru -Ushinawareta Denshō-, 
            "FolksSoul -Lost Folklore-") is an action role-playing video game developed by Game Republic and published by Sony Computer Entertainment. 
            The game is set in Ireland and the Celtic Otherworld of Irish mythology, centering on a young woman named Ellen, 
            and a journalist named Keats, both playable characters who together unravel the mystery that the quaint village of Doolin hides,
            the mystery that can only be solved by seeking the memories of the dead in the dangerous, Folk-ridden Netherworld.
          </Typography>
          <Typography paragraph>
            ESRB Rating: T - Teen
          </Typography>
          <Typography paragraph>
            Genre(s): Role-Playing
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
