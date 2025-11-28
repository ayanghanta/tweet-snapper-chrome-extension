export function RemoveStatusToggleButton() {
  return `
    <div>
      <p class="controll_title">Remove stats bar</p>
      <button class="controll_btn btn_on" id="status_bar_remove_btn">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="controll_svg_icon_toggle of_btn"
          viewBox="0 0 256 256"
          >
          <path
            d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144Zm0,112a40,40,0,1,1,40-40A40,40,0,0,1,176,168Z"
          ></path>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="controll_svg_icon_toggle on_btn"
          viewBox="0 0 256 256"
        >
          <path d="M176,56H80a72,72,0,0,0,0,144h96a72,72,0,0,0,0-144ZM80,168a40,40,0,1,1,40-40A40,40,0,0,1,80,168Z"></path>
        </svg>
      </button>
    </div>`;
}

export function RangeControoler() {
  return `
    <div>
      <p class="controll_title">Adjust border radius</p>
      <input
        type="range"
        id="border_radious_controller_btn"
        max="20"
        min="0"
        class="range_controller"
        value="0"
      />
    </div>`;
}

export function ExportTweetButton() {
  return `
    <div class="export_container">
      <button id="tweet_export_btn" class="controll_btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="controll_svg_icon"
          viewBox="0 0 256 256"
        >
          <path d="M240,136v64a16,16,0,0,1-16,16H32a16,16,0,0,1-16-16V136a16,16,0,0,1,16-16H72a8,8,0,0,1,0,16H32v64H224V136H184a8,8,0,0,1,0-16h40A16,16,0,0,1,240,136Zm-117.66-2.34a8,8,0,0,0,11.32,0l48-48a8,8,0,0,0-11.32-11.32L136,108.69V24a8,8,0,0,0-16,0v84.69L85.66,74.34A8,8,0,0,0,74.34,85.66ZM200,168a12,12,0,1,0-12,12A12,12,0,0,0,200,168Z"></path>
        </svg>
        <span> Export tweet </span>
      </button>
    </div>`;
}
