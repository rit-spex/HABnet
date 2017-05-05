import Main from '../containers/Main';
import Home from '../containers/Home';
import Statistics from '../containers/Statistics';
import OrientationVisualizer from '../containers/OrientationVisualizer';
import AvionicsVisualizer from '../containers/AvionicsVisualizer';
import MobileDataCollection from '../containers/MobileDataCollection';
import FakeDataGenerator from '../containers/FakeDataGenerator';
import About from '../containers/About';
import Custom404 from '../containers/Custom404';

export default function () {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="statistics" component={Statistics} />
      <Route path="orientation" component={OrientationVisualizer} />
      <Route path="avionics" component={AvionicsVisualizer} />
      <Route path="mobileData" component={MobileDataCollection} />
      <Route path="dataGenerator" component={FakeDataGenerator} />
      <Route path="about" component={About} />
      <Route path='404' component={Custom404} />
      <Redirect from='*' to='/404' />
    </Route>
  );
}
