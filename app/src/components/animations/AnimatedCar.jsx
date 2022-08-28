import '../../static/css/animationStyle.css';

export function AnimatedCar() {
  return (
    <div className="animated-container">
      <img src={require('../../static/images/car.png')} />
      <div className="grass-container" />
    </div>
  );
}
