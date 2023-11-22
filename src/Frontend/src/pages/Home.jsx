import Chat from '../components/Chat';
import History from '../components/History';

const Home = () => {
  return (
    <div className='flex'>
      <History />
      <Chat />
    </div>
  );
};

export default Home;