import JsonTable from '../components/JsonTable';

const sample = [
  { id: 1, nombre: 'Abigail', email: 'a@gmail.com' },
  { id: 2, nombre: 'Alejandra', email: 'al@gmail.com' },
  { id: 3, nombre: 'Jose', email: 'j@gmail.com' },
];

export default function Home() {
  return (
    <main className="p-6">
      <JsonTable data={sample} />
    </main>
  );
}
