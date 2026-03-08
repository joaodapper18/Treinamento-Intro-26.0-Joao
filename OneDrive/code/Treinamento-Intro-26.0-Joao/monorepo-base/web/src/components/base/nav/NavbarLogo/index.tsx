import Link from "next/link";

function NavbarLogo({ isH2 }: { isH2?: boolean }) {
  return (
    <Link className="flex items-center gap-2" href="/">
      {}
      <div style={{ backgroundColor: '#db2777', color: 'white', padding: '5px 10px', borderRadius: '8px', fontWeight: 'bold' }}>
        x.x
      </div>
      {isH2 ? <h2 className="font-bold text-3xl text-pink-600">MathStore</h2> : <h1 className="font-bold text-3xl text-pink-600">MathStore</h1>}
    </Link>
  );
}

export default NavbarLogo;