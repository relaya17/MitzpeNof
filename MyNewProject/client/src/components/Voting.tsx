// components/Voting.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchQuestions, vote } from '../redux/slice/votingSlice';

const Voting: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector((state: RootState) => state.voting.questions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  const handleVote = (questionId: string, optionIndex: number) => {
    dispatch(vote({ questionId, optionIndex }));
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">הצבעות דיירים</h2>
      {questions.map((question) => (
        <div key={question._id} className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">{question.question}</h5>
            <ul className="list-group">
              {question.options.map((option, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                  {option.text}
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleVote(question._id, index)}
                  >
                    הצבע
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Voting;
