import React from "react";

interface Props {
  question: string;
  answers: string[];
  userAnswer: any;
  questionNumber: number;
  totalQuestion: number;
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const QuizCard: React.FC<Props> = ({
  question,
  answers,
  userAnswer,
  questionNumber,
  totalQuestion,
  callBack,
}) => {
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestion}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => (
          <div key={answer}>
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callBack}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCard;
