import Image from 'next/image';

//  Next.js는 이 파일을 자동으로 감지하고, 해당 경로의 페이지가 로딩 중일 때 이 컴포넌트를 렌더링함
export default function Loading() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <Image
                src="/pokemon-ball.png"
                alt="포켓몬 도감 불러오는중"
                width={120}
                height={90}
                className="animate-shake-once"
            />
            <p className="text-2xl font-bold mt-3">포켓몬 정보 불러오는중...</p>
        </div>
    );
}
