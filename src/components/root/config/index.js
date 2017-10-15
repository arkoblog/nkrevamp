const transitionOptions = {
  transitionName: 'fade',
  transitionEnterTimeout: 1000,
  transitionLeaveTimeout: 1000,
  transitionAppearTimeout: 1000,
  transitionAppear: true,
};

const breakpoint = 768;

const colorScheme = [
  '#1f77b4',
  '#aec7e8',
  '#ff7f0e',
  '#ffbb78',
  '#2ca02c',
  '#d62728',
  '#9467bd',
  '#c5b0d5',
  '#8c564b',
  '#c49c94',
  '#e377c2',
  '#f7b6d2',
  '#98df8a',
  '#7f7f7f',
  '#ff9896',
  '#c7c7c7',
  '#bcbd22',
  '#dbdb8d',
  '#17becf',
  '#9edae5',
];


const wards = [
  { value: '', label: 'All Wards' },
  { value: '1', label: 'Ward 1' },
  { value: '2', label: 'Ward 2' },
  { value: '3', label: 'Ward 3' },
  { value: '4', label: 'Ward 4' },
  { value: '5', label: 'Ward 5' },
  { value: '6', label: 'Ward 6' },
  { value: '7', label: 'Ward 7' },
  { value: '8', label: 'Ward 9' },
  { value: '10', label: 'Ward 10' },
  { value: '11', label: 'Ward 11' },
  { value: '12', label: 'Ward 12' },
  { value: '13', label: 'Ward 13' },
  { value: '14', label: 'Ward 14' },
];

const categories = [
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'construction', label: 'Construction' },
  { value: 'education', label: 'Education' },
  { value: 'electricity', label: 'Electricity' },
  { value: 'health', label: 'Health' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'irrigation', label: 'Irrigation' },
  { value: 'religion_culture_recreation', label: 'Religion/Culture' },
  { value: 'targeted_group', label: 'Targeted Groups' },
  { value: 'transport', label: 'Transport' },
  { value: 'waste_management', label: 'Waste Management' },
];

const projectTypes = [

  { value: '', label: 'Show all projects' },
  { value: 'approved', label: 'Approved' },
  { value: 'proposed', label: 'Proposed' },
];

const budgetRange = [
  { value: '', label: 'Any budget' },
  { value: 'not_allocated', label: 'Not Allocated' },
  { value: '0to175000', label: 'Less than 1,75,000' },
  { value: '175000to275000', label: '1,75,000 to 2,75,000' },
  { value: '275000to375000', label: '2,75,000 to 3,75,000' },
  { value: '375000to500000', label: '3,75,000 and above' },
];

const navigation = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/services',
    label: 'Services',
  },
  {
    path: '/projects',
    label: 'Projects',
  },
  {
    path: '/resources',
    label: 'Resources',
  },
  {
    path: '/inmaps',
    label: 'Nilkantha in Maps',
  },
];


const config = {
  transitionOptions,
  breakpoint,
  navigation,
  colorScheme,
  wards,
  categories,
  projectTypes,
  budgetRange,
};


export default config;
