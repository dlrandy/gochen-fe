import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
  const navigate = useNavigate();
  // const [error, setError] = useState<string>('');
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (Math.random() > 0.5) {
      navigate('/vip/');
    } else {
      navigate('/vip/super');
    }
  }
  // console.log(error);

  return (
    <div>
      post detail
      <form onSubmit={handleSubmit}>
        sdsfsdf form
        <button type="submit">提交</button>
      </form>
    </div>
  );
};
export default Index;
