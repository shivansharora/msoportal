
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import Person from "@material-ui/icons/Person";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import BookIcon from '@material-ui/icons/Book';
import ComputerIcon from '@material-ui/icons/Computer';
import StorageIcon from '@material-ui/icons/Storage';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import RedeemIcon from '@material-ui/icons/Redeem';

export default [
  {
    pages: [
      {
        title: 'Dashboard',
        href: '/dashboard',
        icon: DashboardIcon,
      },
      {
        title: 'Doctor Category',
        href: '/doctor_category',
        icon: LocalHospitalIcon,
      },
      {
        title: 'Patient List',
        href: '/patient_list',
        icon: Person,
      },
      {
        title: 'Create Patient',
        href: '/create_patient',
        icon: PersonAddIcon,
      },
      {
        title: 'Appointment',
        href: '/book_appointment_list',
        icon: BookIcon,
      },
      {
        title: 'Flow Board',
        href: '/flow_board',
        icon: ComputerIcon,
      },
      {
        title: 'Promo Code',
        href: '/promocode',
        icon: RedeemIcon,
      },
      // {
      //   title: 'Patient Summary',
      //   href: '/patient_summary',
      //   icon: LibraryBooks,
      // },
      {
        title: 'Training Material',
        href: '/training_material',
        icon: StorageIcon,
      },
      {
        title: 'Notification',
        href: '/notification',
        icon: NotificationImportantIcon,
      },
      {
        title: 'Profile',
        href: '/profile',
        icon: AccountCircleIcon,
      },
      // {
      //   title: 'Webcam',
      //   href: '/webcam',
      //   icon: AccountCircleIcon,
      // },
      // {
      //   title: 'Logout',
      //   href: '/auth/login',
      //   icon: ExitToAppIcon
      // },
    ]
  }
];
