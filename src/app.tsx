import { useMemo, useRef, useState, useEffect } from "react"
import animeData from "../anime-data"
import { domToBlob } from "modern-screenshot"
import { toast } from "sonner"
import { usePersistState } from "./hooks"

const analyzeEnv = (titles: string[]) => {
  const envKeywords = {
    "日月AB标（1.5）": ["GX", "裂空", "投掷猴", "爆肌蚊"],
    "日月C标（2.5）": ["TT", "泥偶", "乌贼王", "鬼树"],
    "剑盾D标（4.5）": ["VMAX", "彩超", "三神苍响", "多龙"],
    "剑盾E标（6.5）": ["黑马", "耿鬼", "连击", "汇流"],
    "剑盾F标前期（7.5）": ["帕路奇亚", "叶伊布", "光辉喷"],
    "剑盾F标后期（8.5）": ["洛奇亚", "宙斯", "放逐"],
    "朱紫G标环境（11.0）": ["密勒顿", "古剑豹", "挡道"],
  }

  for (const [env, keywords] of Object.entries(envKeywords)) {
    if (keywords.some((kw) => titles.some((title) => title.includes(kw)))) {
      return `偏好环境：${env}`
    }
  }

  return "偏好环境：多环境混合"
}

export const App = () => {
  const [selectedAnime, setSelectedAnime] = usePersistState<string[]>(
    "selectedAnime",
    []
  )

  const wrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.title = "卡组世代 - 集换社"
  }, [])

  const imageToBlob = async () => {
    if (!wrapper.current) return

    const blob = await domToBlob(wrapper.current, {
      scale: 2,
      filter(el) {
        if (el instanceof HTMLElement && el.classList.contains("remove")) {
          return false
        }
        return true
      },
    })

    return blob
  }

  const copyImage = async () => {
    const blob = await imageToBlob()
    if (!blob) return

    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ])
  }

  const downloadImage = async () => {
    const blob = await imageToBlob()
    if (!blob) return

    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "card-sedai.png"
    a.click()
    URL.revokeObjectURL(url)
  }

  const totalAnime = Object.values(animeData).flatMap((year) =>
    year.map((item) => item.title).slice(0, 10)
  ).length

  const prompt = useMemo(() => {
    const allTitles = Object.values(animeData).flatMap((year) =>
      year.map((item) => item.title).slice(0, 10)
    )
    const selectedTitles = allTitles.filter((title) =>
      selectedAnime.includes(title)
    )
    const unselectedTitles = allTitles.filter(
      (title) => !selectedAnime.includes(title)
    )

    return `
你所选择的宝可梦卡组如下（共 ${selectedTitles.length} 个）：
${selectedTitles.map((title) => `- ${title}`).join("\n")}

未选择的卡组如下（共 ${unselectedTitles.length} 个）：
${unselectedTitles.map((title) => `- ${title}`).join("\n")}

${analyzeEnv(selectedTitles)}
    `.trim()
  }, [selectedAnime])

  return (
    <>
      <div className="flex flex-col gap-4 pb-10">
        <div className="p-4 flex flex-col md:items-center">
          <div className="w-full overflow-x-auto">
            <div
              className="flex flex-col border border-b-0 bg-white w-fit mx-auto"
              ref={wrapper}
            >
              <div className="border-b justify-between p-2 text-lg font-bold flex">
                <h1>
                  卡组世代 - 点击选择你玩过的卡组
                  <span className="ml-2 text-zinc-400 font-medium">详情见集换社卡组广场</span>
                </h1>
                <span className="shrink-0 whitespace-nowrap">
                  我玩过 {selectedAnime.length} / {totalAnime} 个卡组
                </span>
              </div>

              {Object.keys(animeData).map((year) => {
                const items = animeData[year] || []
                return (
                  <div key={year} className="flex border-b">
                    <div className="bg-red-500 shrink-0 text-white flex items-center font-bold justify-center p-1 border-black h-16 md:h-20 w-16 md:w-20">
                      <span className="text-center text-base">{year}</span>
                    </div>

                    <div className="flex shrink-0">
                      {items.slice(0, 10).map((item) => {
                        const animeKey = item.title
                        const isSelected = selectedAnime.includes(animeKey)

                        return (
                          <button
                            key={animeKey}
                            className={`h-16 md:h-20 w-16 md:w-20 border-l break-words text-center shrink-0 inline-flex items-center p-1 overflow-hidden justify-center cursor-pointer text-sm ${
                              isSelected
                                ? "bg-[#fed90b]"
                                : "hover:bg-zinc-100"
                            } transition-colors duration-200`}
                            title={animeKey}
                            onClick={() => {
                              setSelectedAnime((prev) =>
                                isSelected
                                  ? prev.filter((title) => title !== animeKey)
                                  : [...prev, animeKey]
                              )
                            }}
                          >
                            <span className="leading-tight w-full line-clamp-3">
                              {animeKey}
                            </span>
                          </button>
                        )
                      })}
                      {Array.from(
                        { length: Math.max(0, 10 - items.length) },
                        (_, index) => (
                          <div
                            key={`empty-${index}`}
                            className="h-16 md:h-20 w-16 md:w-20 border-l bg-gray-50"
                          />
                        )
                      )}
                      <div className="w-0 h-16 md:h-20 border-r" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={() => {
              setSelectedAnime(
                Object.values(animeData)
                  .flatMap((year) => year.map((item) => item.title))
              )
            }}
          >
            全选
          </button>

          {selectedAnime.length > 0 && (
            <button
              type="button"
              className="border rounded-md px-4 py-2 inline-flex"
              onClick={() => setSelectedAnime([])}
            >
              清空
            </button>
          )}

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={() => {
              toast.promise(copyImage(), {
                success: "已复制截图",
                loading: "截图中...",
                error: "截图失败",
              })
            }}
          >
            复制截图
          </button>

          <button
            type="button"
            className="border rounded-md px-4 py-2 inline-flex"
            onClick={() => {
              toast.promise(downloadImage(), {
                success: "已下载图片",
                loading: "下载中...",
                error: "下载失败",
              })
            }}
          >
            下载图片
          </button>
        </div>

        <div className="flex flex-col gap-2 max-w-screen-md w-full mx-auto">
          <div className="border focus-within:ring-2 ring-pink-500 focus-within:border-pink-500 rounded-md">
            <div className="flex items-center justify-between p-2 border-b">
              <div className="font-bold">生成总结</div>
              <button
                type="button"
                className="text-sm text-zinc-500 hover:bg-zinc-100 px-1.5 h-7 flex items-center rounded-md"
                onClick={() => {
                  navigator.clipboard.writeText(prompt)
                  toast.success("已复制")
                }}
              >
                复制
              </button>
            </div>
            <textarea
              readOnly
              className="outline-none w-full p-2 resize-none cursor-default"
              rows={10}
              value={prompt}
            />
            <div className="text-xs text-gray-500 p-2 border-t">
              请把复制好的内容粘贴到 GPT 等 AI 工具获取卡组倾向分析。
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 mt-4">
          本项目基于 <a href="https://github.com/egoist/anime-sedai" target="_blank" className="underline">anime-sedai</a> 改造，使用 <a href="https://opensource.org/licenses/MIT" target="_blank" className="underline">MIT License</a> 发布。
        </div>
      </div>
    </>
  )
} 
