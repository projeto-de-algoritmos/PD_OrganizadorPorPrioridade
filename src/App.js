import React, { useCallback, useState } from 'react';

import { 
  Container, 
  TableContainer, 
  InputContainer, 
  Input, 
  Button, 
  Title, 
  TextDescription,
  SolutionText
} from './styles';

import Scheduling from './weighted_scheduling';

function App() {
  const [tasks, setTasks] = useState([]);
  const [solution, setSolution] = useState([]);

  const [task, setTask] = useState('');
  const [value, setValue] = useState(undefined);
  const [start, setStart] = useState(undefined);
  const [deadline, setDeadline] = useState(undefined);

  const handleSolution = useCallback(() => {
    const schedule = new Scheduling(tasks);

    schedule.sort_vector();
    schedule.fill2P();
    schedule.OPT(tasks.length - 1);
    schedule.findSolution(tasks.length - 1);

    const solution = schedule.solutionSet.reverse();
    setSolution([...solution]);
    setTasks([]);
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    if(task.length && value && start && deadline){
      setSolution([]);
      setTasks(prevTasks => ([...prevTasks, { task, value, start, deadline }]));

      setTask('');
      setValue(0);
      setStart(0);
      setDeadline(0);
    }

  }, [task, value, start, deadline]);

  return (
    <Container>

    <Title>
      Organizador de atividade por prioridade
    </Title>
    <TextDescription>
    Você costuma ter dificuldades para definir seu horário e quais atividades você precisa fazer de forma a conseguir ser mais produtivo levando em consideração a importância de cada atividade?
    Nós vamos te ajudar! Basta inserir as atividades que você precisa fazer com seus respectivos pesos e depois clicar em solução para saber qual a melhor combinação de atividade para que você consiga extrair o máximo do seu tempo.
    </TextDescription>


    <InputContainer>
    <span>Nome:</span>
      <Input value={task} required onChange={(task) => setTask(task.target.value)} placeholder="Nome da atividade" />
    <span>Peso da atividade:</span>
      <Input value={value} required onChange={(value) => setValue(value.target.value)} placeholder="Ex = 2" />
    <span>Início:</span>
      <Input  value={start} required onChange={(start) => setStart(start.target.value)} placeholder="Ex = 12" />
    <span>Término:</span>
      <Input  value={deadline} required onChange={(deadline) => setDeadline(deadline.target.value)} placeholder="Ex = 15" />
    </InputContainer>
    <Button onClick={handleAddTask}>Adicionar</Button>

    <SolutionText>Adicionou todas as atividades? Basta clicar em solução para descobrir qual a melhor combinação de atividades para hoje.</SolutionText>
    <Button onClick={handleSolution}>Solução</Button>


    <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor</th>
                <th>Começo</th>
                <th>Fim</th>
              </tr>
            </thead>

            <tbody>
              {solution.length ? solution.map((solution, index) => (
                <tr key={index}>
                  <td className="solution">{solution.task}</td>
                  <td className="solution">{solution.value}</td>
                  <td className="solution">{solution.start}</td>
                  <td className="solution">{solution.deadline}</td>
                </tr>
              )) : tasks.map((task, index) => (
                <tr key={index}>
                  <td >{task.task}</td>
                  <td>{task.value}</td>
                  <td>{task.start}</td>
                  <td>{task.deadline}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </TableContainer>
        </Container>
  );
}

export default App;
