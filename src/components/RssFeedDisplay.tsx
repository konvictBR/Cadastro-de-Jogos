import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

interface RssItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  enclosure?: {
    link: string;
  };
  thumbnail: string;
}

interface RssFeed {
  feed: {
    title: string;
    link: string;
    description: string;
  };
  items: RssItem[];
}

const RssFeedDisplay: React.FC = () => {
  const [feed, setFeed] = useState<RssFeed | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useContext(ThemeContext);

  const rssFeedUrl = 'https://www.gamespot.com/feeds/news/';
  const rssToJsonApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeedUrl)}`;

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(rssToJsonApiUrl);
        if (!response.ok) {
          if (response.status === 422) {
            setError(
              'Falha ao carregar notícias: Erro 422. Verifique a chave da API e se o feed RSS está acessível.'
            );
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }
        const data: any = await response.json();

        if (data && data.items) {
          console.log('Total items fetched:', data.items.length);

          // Filter items to only include those published in the last 24 hours
          const now = new Date();
          const latestItems = data.items.filter((item: RssItem) => {
            const pubDate = new Date(item.pubDate);
            const diff = now.getTime() - pubDate.getTime();
            const diffInHours = diff / (1000 * 3600);
            return diffInHours <= 24;
          });

          console.log('Items after filtering:', latestItems.length);

          if (latestItems.length === 0) {
            setError('Nenhuma notícia nova encontrada nas últimas 24 horas.');
          }

          setFeed({ feed: data.feed, items: latestItems });
        } else {
          throw new Error('Failed to parse RSS feed');
        }
      } catch (e: any) {
        console.error('Failed to fetch RSS feed:', e);
        setError(`Falha ao carregar notícias: ${e.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const cardBase = `rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg flex flex-col`;
  const cardLight = `bg-white text-gray-800`;
  const cardDark = `bg-gray-800 text-gray-200`;
  const linkLight = `text-blue-600 hover:text-blue-800`;
  const linkDark = `text-blue-400 hover:text-blue-300`;

  return (
    <div className="w-full max-w-6xl mx-auto mt-8 px-4">
      <h3 className={`text-2xl font-semibold mb-6 text-center ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
        Últimas Notícias de Jogos (GameSpot)
      </h3>
      {loading && <p className="text-center">Carregando notícias...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {feed && feed.items && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feed.items.slice(0, 12).map((item, index) => {
            const thumbnailUrl = item.thumbnail || (item.enclosure ? item.enclosure.link : '');
            return (
              <div key={index} className={`${cardBase} ${theme === 'light' ? cardLight : cardDark}`}>
                {thumbnailUrl && (
                  <img
                    src={thumbnailUrl}
                    alt={item.title || 'Feed item image'}
                    className="w-full h-40 object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image: ${thumbnailUrl}`, e);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-lg mb-2 flex-grow">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:underline ${theme === 'light' ? linkLight : linkDark}`}
                    >
                      {item.title
                        .replace(/&amp;/g, '&')
                        .replace(/&quot;/g, '"')
                        .replace(/&#039;/g, "'")}
                    </a>
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 mt-auto">
                    {new Date(item.pubDate).toLocaleDateString('pt-BR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium ${theme === 'light' ? linkLight : linkDark}`}
                  >
                    Leia mais &rarr;
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {feed && (
        <p className={`text-center text-sm mt-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          Notícias fornecidas por{' '}
          <a
            href={feed.feed.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline ${theme === 'light' ? linkLight : linkDark}`}
          >
            {feed.feed.title}
          </a>{' '}
          via GameSpot
        </p>
      )}
    </div>
  );
};

export default RssFeedDisplay;
