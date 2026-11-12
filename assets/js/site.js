/*
==============================================================================
  InnoRevision, Inc.

  File:  site.js
  Brief: Shared capability-tile behavior.

  Copyright (c) 2026 InnoRevision, Inc. All Rights Reserved.
==============================================================================
*/

"use strict";

/**
 * Draws the four capability-tile outlines around the center logo.
 * The same behavior is shared by the homepage and all service pages.
 */
(() => {
  const grid = document.querySelector(".panel-grid");
  if (!grid) return;

  const panels = [...grid.querySelectorAll(":scope > .service")];
  const outlineLayer = grid.querySelector(":scope > .tile-outlines");
  const center = grid.querySelector(":scope > .centerpiece");

  if (!outlineLayer || !center || panels.length !== 4) return;

  const SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  const TILE_COLORS = ["#1d2654", "#1d2654", "#299dcc", "#299dcc"];

  function createOutlinePath(width, height, cutout, radius, fillet) {
    const cut = Math.min(cutout, height - 28, width - 50);
    const corner = Math.min(fillet, cut * 0.12);

    return `M ${radius} 1 H ${width - radius}
      Q ${width - 1} 1 ${width - 1} ${radius}
      V ${height - cut - corner}
      Q ${width - 1} ${height - cut} ${width - 1 - corner} ${height - cut}
      A ${cut} ${cut} 0 0 0 ${width - cut} ${height - 1 - corner}
      Q ${width - cut} ${height - 1} ${width - cut - corner} ${height - 1}
      H ${radius}
      Q 1 ${height - 1} 1 ${height - radius}
      V ${radius}
      Q 1 1 ${radius} 1 Z`;
  }

  function drawTileOutlines() {
    const gridBounds = grid.getBoundingClientRect();
    if (gridBounds.width < 1) return;

    outlineLayer.setAttribute("viewBox", `0 0 ${gridBounds.width} ${gridBounds.height}`);
    outlineLayer.setAttribute("preserveAspectRatio", "none");
    outlineLayer.replaceChildren();

    const centerBounds = center.getBoundingClientRect();
    const cutout = Math.min(centerBounds.width / 2 - 3, centerBounds.height / 2 - 3);

    panels.forEach((panel, index) => {
      const panelBounds = panel.getBoundingClientRect();
      const x = panelBounds.left - gridBounds.left;
      const y = panelBounds.top - gridBounds.top;
      const width = panelBounds.width;
      const height = panelBounds.height;
      const flipX = index % 2 === 1;
      const flipY = index >= 2;
      const color = TILE_COLORS[index];

      const group = document.createElementNS(SVG_NAMESPACE, "g");
      group.setAttribute(
        "transform",
        `translate(${x + (flipX ? width : 0)} ${y + (flipY ? height : 0)}) ` +
          `scale(${flipX ? -1 : 1} ${flipY ? -1 : 1})`,
      );

      const outline = document.createElementNS(SVG_NAMESPACE, "path");
      outline.setAttribute("class", "tile-shape");
      outline.setAttribute("d", createOutlinePath(width, height, cutout, 8, 8));
      outline.setAttribute("stroke", color);
      outline.setAttribute("fill", panel.classList.contains("selected") ? color : "#ffffff");
      group.appendChild(outline);

      const accent = document.createElementNS(SVG_NAMESPACE, "path");
      accent.setAttribute("class", "tile-accent");
      accent.setAttribute("d", `M 8 2 H ${width - 8}`);
      accent.setAttribute("stroke", color);
      group.appendChild(accent);

      outlineLayer.appendChild(group);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", drawTileOutlines);
  } else {
    drawTileOutlines();
  }

  window.addEventListener("resize", drawTileOutlines, { passive: true });

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(drawTileOutlines);
    resizeObserver.observe(grid);
  }
})();
