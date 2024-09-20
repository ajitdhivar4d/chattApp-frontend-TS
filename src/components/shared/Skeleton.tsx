
interface SkeletonProps {
  variant?: 'text' | 'rect' | 'circle';
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  customStyles?: React.CSSProperties;
}

const Skeleton = ({ variant = 'text', width, height, circle = false, customStyles = {} }: SkeletonProps) => {
  const styles = {
    width: width || (circle ? '50px' : '100%'),
    height: height || (variant === 'text' ? '20px' : '100px'),
    borderRadius: circle ? '50%' : '4px',
    ...customStyles
  };

  return <div className={`skeleton ${variant}`} style={styles}></div>;
};

export default Skeleton;


// <Skeleton variant="circle" width={50} height={50} />
//  <Skeleton variant="text" width="60%" />
{/* <Skeleton variant="rect" width="100%" height="200px" customStyles={{ backgroundColor: '#ccc' }} /> */}
