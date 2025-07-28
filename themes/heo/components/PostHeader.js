import { HashTag } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import WordCount from '@/components/WordCount'
import { siteConfig } from '@/lib/config'
import { formatDateFmt } from '@/lib/utils/formatDate'
import Link from 'next/link'
import WavesArea from './WavesArea'

export default function PostHeader({ post, siteInfo, isDarkMode }) {
  if (!post) return null

  const headerImage = post.pageCover || siteInfo?.pageCover
  const ANALYTICS_BUSUANZI_ENABLE = siteConfig('ANALYTICS_BUSUANZI_ENABLE')

  return (
    <header
      id="post-bg"
      className="md:mb-0 -mb-5 w-full h-[30rem] relative md:flex-shrink-0 overflow-hidden bg-cover bg-center bg-no-repeat z-10"
      role="banner"
    >
      <style jsx>{`
        .coverdiv:after {
          position: absolute;
          content: '';
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          box-shadow: 110px -130px 500px 100px ${isDarkMode ? '#CA8A04' : '#0060e0'} inset;
        }
      `}</style>

      <div
        className={`${isDarkMode ? 'bg-[#CA8A04]' : 'bg-[#0060e0]'} absolute top-0 w-full h-full py-10 flex justify-center items-center`}
      >
        {/* 背景图 */}
        <div
          className="coverdiv lg:opacity-50 lg:translate-x-96 lg:rotate-12"
          style={{ filter: 'blur(15px)' }}
        >
          <LazyImage
            id="post-cover"
            className="w-full h-full object-cover max-h-[50rem] min-w-[50vw] min-h-[20rem]"
            src={headerImage}
            alt={post.title}
          />
        </div>

        {/* 内容区域 */}
        <div
          id="post-info"
          className="absolute top-48 z-10 flex flex-col space-y-4 lg:-mt-12 w-full max-w-[86rem] px-5"
        >
          {/* 分类和标签 */}
          <div className="flex justify-center md:justify-start items-center gap-4">
            {post.category && (
              <Link
                href={`/category/${post.category}`}
                className="mr-4 font-sm font-bold px-3 py-1 rounded-lg hover:bg-white text-white bg-blue-500 dark:bg-yellow-500 hover:text-blue-500 duration-200"
              >
                {post.category}
              </Link>
            )}

            {post.tagItems?.length > 0 && (
              <div className="hidden md:flex justify-center flex-nowrap overflow-x-auto">
                {post.tagItems.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/tag/${encodeURIComponent(tag.name)}`}
                    className="text-gray-50 hover:text-white duration-200 py-0.5 px-1 whitespace-nowrap flex items-center"
                  >
                    <HashTag className="text-gray-200 stroke-2 mr-0.5 w-3 h-3" />
                    {tag.name}
                    {tag.count ? `(${tag.count})` : ''}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 文章标题 */}
          <h1 className="max-w-5xl font-bold text-3xl lg:text-5xl md:leading-snug shadow-text-md text-white flex justify-center md:justify-start">
            {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
            <span>{post.title}</span>
          </h1>

          {/* 发布信息 */}
          <section className="flex-wrap dark:text-gray-200 text-opacity-70 shadow-text-md flex text-sm justify-center md:justify-start mt-4 text-white font-light leading-8">
            <div className="flex items-center mr-4">
              <WordCount />
            </div>

            {post?.type !== 'Page' && (
              <time
                dateTime={post?.publishDate}
                className="pl-1 mr-2 flex items-center hover:underline"
              >
                <i className="fa-regular fa-calendar mr-1"></i>
                {post?.publishDay}
              </time>
            )}

            <time dateTime={post?.lastEditedDate} className="pl-1 mr-2 flex items-center">
              <i className="fa-regular fa-calendar-check mr-1"></i>
              {post.lastEditedDay}
            </time>

            {ANALYTICS_BUSUANZI_ENABLE && (
              <div className="busuanzi_container_page_pv font-light mr-2">
                <i className="fa-solid fa-fire-flame-curved"></i>{' '}
                <span className="mr-2 busuanzi_value_page_pv" />
              </div>
            )}
          </section>
        </div>

        <WavesArea />
      </div>
    </header>
  )
}
