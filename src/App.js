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

  const [name, setName] = useState('');
  const [value, setValue] = useState(undefined);
  const [start, setStart] = useState(undefined);
  const [end, setEnd] = useState(undefined);

  const handleSolution = useCallback(() => {
    const schedule = new Scheduling(tasks);
    schedule.sort_vector();
    schedule.fill2P();
    schedule.OPT(tasks.length - 1);
    schedule.findSolution(tasks.length - 1);

    const solution = schedule.solutionSet;
    console.log(solution);
    setSolution([...solution]);
    setTasks([]);
  }, [tasks]);

  const handleAddTask = useCallback(() => {
    if(name.length && value && start && end){
      setSolution([]);
      setTasks(prevTasks => ([...prevTasks, { name, value, start, end }]));

      setName('');
      setValue(0);
      setStart(0);
      setEnd(0);
    }

  }, [name, value, start, end]);

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
      <Input value={name} required onChange={(name) => setName(name.target.value)} placeholder="Nome da atividade" />
    <span>Peso da atividade:</span>
      <Input value={value} required onChange={(value) => setValue(value.target.value)} placeholder="Ex = 2" />
    <span>Início:</span>
      <Input  value={start} required onChange={(start) => setStart(start.target.value)} placeholder="Ex = 12" />
    <span>Término:</span>
      <Input  value={end} required onChange={(end) => setEnd(end.target.value)} placeholder="Ex = 15" />
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
                  <td className="solution">{solution.name}</td>
                  <td className="solution">{solution.value}</td>
                  <td className="solution">{solution.start}</td>
                  <td className="solution">{solution.end}</td>
                </tr>
              )) : tasks.map((task, index) => (
                <tr key={index}>
                  <td >{task.name}</td>
                  <td>{task.value}</td>
                  <td>{task.start}</td>
                  <td>{task.end}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </TableContainer>
        </Container>
  );
}

export default App;
