import DashboardIcon from "@mui/icons-material/Dashboard";
import CampaignIcon from "@mui/icons-material/Campaign";
import SocialIcon from "@mui/icons-material/Share";
import AutomationIcon from "@mui/icons-material/Autorenew";
import SurveyIcon from "@mui/icons-material/Assignment";
import InsightsIcon from "@mui/icons-material/Insights";
import WebinarIcon from "@mui/icons-material/Videocam";
import BackstageIcon from "@mui/icons-material/MeetingRoom";
import { ROUTES } from "../../constants/route.constant";

const initialMenuState = {
  type: "",
  open: false,
};

const sidebarRoutes = [
  {
    label: "Dashboard",
    isMenu: false,
    img: <DashboardIcon />,
    route: ROUTES.DASHBOARD,
    subItems: [],
  },
  {
    label: "Campaigns",
    isMenu: false,
    img: <CampaignIcon />,
    route: ROUTES.COMPAIGNS,
    subItems: [],
  },
  {
    label: "Social",
    isMenu: false,
    img: <SocialIcon />,
    route: ROUTES.SOCIAL,
    subItems: [],
  },
  {
    label: "Marketing Automation",
    isMenu: false,
    img: <AutomationIcon />,
    route: ROUTES.MARKETING_AUTOMATION,
    subItems: [],
  },
  {
    label: "Survey",
    isMenu: false,
    img: <SurveyIcon />,
    route: ROUTES.SURVEY,
    subItems: [],
  },
  {
    label: "PageSense",
    isMenu: false,
    img: <InsightsIcon />,
    route: ROUTES.PAGE_SENSE,
    subItems: [],
  },
  {
    label: "Webinar",
    isMenu: false,
    img: <WebinarIcon />,
    route: ROUTES.WEBINAR,
    subItems: [],
  },
  {
    label: "BackStage",
    isMenu: false,
    img: <BackstageIcon />,
    route: ROUTES.BACKSTAGE,
    subItems: [],
  },
];

export { sidebarRoutes, initialMenuState };
