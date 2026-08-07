declare module "pagedjs" {
  export class Previewer {
    preview(
      content: string | HTMLElement | DocumentFragment,
      stylesheets?: string[],
      renderTo?: string | HTMLElement
    ): Promise<{
      total: number;
    }>;
  }
}
