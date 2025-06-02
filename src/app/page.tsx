import ChatWindow from '../../components/ChatWindow';

// Ana sayfa: Modern ve animasyonlu sohbet arayüzü
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-green-100">
      <ChatWindow />
    </main>
  );
}
