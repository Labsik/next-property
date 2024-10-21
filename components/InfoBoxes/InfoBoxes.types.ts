export type InfoBoxType = {
  children: string;
  backgroundColor?: string;
  textColor?: string;
  heading: string;
  buttonInfo: ButtonProps;
};

type ButtonProps = {
  link: string;
  text: string;
  backgroundColor: string;
};
