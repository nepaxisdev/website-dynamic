<script lang="ts">
	import type { Media } from '$backend/src/payload-types';
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import type {
		SerializedParagraphNode,
		SerializedHeadingNode,
		SerializedTextNode,
		SerializedLinkNode
	} from '@payloadcms/richtext-lexical';
	import type {
		SerializedEditorState,
		SerializedLexicalNode
	} from '@payloadcms/richtext-lexical/lexical';

	interface Props {
		content: SerializedEditorState;
	}

	const { content }: Props = $props();

	interface UploadNode extends SerializedLexicalNode {
		type: 'upload';
		fields: {
			id: string;
		};
		value: {
			url?: string;
			alt?: string;
			width?: number;
			height?: number;
			sizes?: Media['sizes'];
		};
	}

	type PayloadLexicalNode =
		| SerializedParagraphNode
		| SerializedHeadingNode
		| SerializedTextNode
		| SerializedLinkNode
		| UploadNode
		| SerializedLexicalNode;

	function getHeadingDepth(node: SerializedHeadingNode): number {
		return node.tag ? parseInt(node.tag.replace('h', '')) : 1;
	}

	function getActualDepth(depth: number): number {
		return depth === 1 ? 2 : depth;
	}

	function getHeadingClass(depth: number): string {
		return depth === 1 ? 'heading-1 content-element' : `content-element heading-${depth}`;
	}

	function getImageSrc(src: string): string {
		return media_url ? `${media_url}${src}` : src;
	}

	function hasImageChild(node: SerializedParagraphNode): boolean {
		return node.children?.some((child) => child.type === 'upload') || false;
	}

	function formatText(node: SerializedTextNode) {
		const format = node.format || 0;

		return {
			...node,
			isBold: !!(format & 1),
			isItalic: !!(format & 2),
			isStrikethrough: !!(format & 4),
			isCode: !!(format & 8),
			isUnderline: !!(format & 16)
		};
	}

	function isHeadingNode(node: PayloadLexicalNode): node is SerializedHeadingNode {
		return node.type === 'heading';
	}

	function isParagraphNode(node: PayloadLexicalNode): node is SerializedParagraphNode {
		return node.type === 'paragraph';
	}

	function isTextNode(node: PayloadLexicalNode): node is SerializedTextNode {
		return node.type === 'text';
	}

	function isLinkNode(node: PayloadLexicalNode): node is SerializedLinkNode {
		return node.type === 'link' || node.type === 'autolink';
	}

	function isUploadNode(node: PayloadLexicalNode): node is UploadNode {
		return node.type === 'upload';
	}

	function isLineBreakNode(node: PayloadLexicalNode): node is SerializedLexicalNode {
		return node.type === 'linebreak';
	}

	const nodes = $derived((content?.root?.children as PayloadLexicalNode[]) || []);
</script>

{#each nodes as node}
	{#if isHeadingNode(node)}
		{@const depth = getHeadingDepth(node)}
		{@const actualDepth = getActualDepth(depth)}
		{@const className = getHeadingClass(depth)}

		{#if actualDepth === 2}
			<h2 class={className}>
				{#each node.children || [] as child}
					{#if isTextNode(child)}
						{@const formatted = formatText(child)}
						{#if formatted.isBold && formatted.isItalic}
							<strong><em>{child.text}</em></strong>
						{:else if formatted.isBold}
							<strong>{child.text}</strong>
						{:else if formatted.isItalic}
							<em>{child.text}</em>
						{:else if formatted.isCode}
							<code>{child.text}</code>
						{:else if formatted.isStrikethrough}
							<s>{child.text}</s>
						{:else if formatted.isUnderline}
							<u>{child.text}</u>
						{:else}
							{child.text}
						{/if}
					{:else if isLinkNode(child)}
						<a
							href={child.fields?.url || '#'}
							title={child.fields?.url || ''}
							target="_blank"
							class="content-element"
							rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						>
							{#each child.children || [] as linkChild}
								{#if isTextNode(linkChild)}
									{linkChild.text}
								{/if}
							{/each}
						</a>
					{/if}
				{/each}
			</h2>
		{:else if actualDepth === 3}
			<h3 class={className}>
				{#each node.children || [] as child}
					{#if isTextNode(child)}
						{@const formatted = formatText(child)}
						{#if formatted.isBold && formatted.isItalic}
							<strong><em>{child.text}</em></strong>
						{:else if formatted.isBold}
							<strong>{child.text}</strong>
						{:else if formatted.isItalic}
							<em>{child.text}</em>
						{:else if formatted.isCode}
							<code>{child.text}</code>
						{:else if formatted.isStrikethrough}
							<s>{child.text}</s>
						{:else if formatted.isUnderline}
							<u>{child.text}</u>
						{:else}
							{child.text}
						{/if}
					{:else if isLinkNode(child)}
						<a
							href={child.fields?.url || '#'}
							title={child.fields?.url || ''}
							target="_blank"
							class="content-element"
							rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						>
							{#each child.children || [] as linkChild}
								{#if isTextNode(linkChild)}
									{linkChild.text}
								{/if}
							{/each}
						</a>
					{/if}
				{/each}
			</h3>
		{:else if actualDepth === 4}
			<h4 class={className}>
				{#each node.children || [] as child}
					{#if isTextNode(child)}
						{@const formatted = formatText(child)}
						{#if formatted.isBold && formatted.isItalic}
							<strong><em>{child.text}</em></strong>
						{:else if formatted.isBold}
							<strong>{child.text}</strong>
						{:else if formatted.isItalic}
							<em>{child.text}</em>
						{:else if formatted.isCode}
							<code>{child.text}</code>
						{:else if formatted.isStrikethrough}
							<s>{child.text}</s>
						{:else if formatted.isUnderline}
							<u>{child.text}</u>
						{:else}
							{child.text}
						{/if}
					{:else if isLinkNode(child)}
						<a
							href={child.fields?.url || '#'}
							title={child.fields?.url || ''}
							target="_blank"
							class="content-element"
							rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						>
							{#each child.children || [] as linkChild}
								{#if isTextNode(linkChild)}
									{linkChild.text}
								{/if}
							{/each}
						</a>
					{/if}
				{/each}
			</h4>
		{:else if actualDepth === 5}
			<h5 class={className}>
				{#each node.children || [] as child}
					{#if isTextNode(child)}
						{@const formatted = formatText(child)}
						{#if formatted.isBold && formatted.isItalic}
							<strong><em>{child.text}</em></strong>
						{:else if formatted.isBold}
							<strong>{child.text}</strong>
						{:else if formatted.isItalic}
							<em>{child.text}</em>
						{:else if formatted.isCode}
							<code>{child.text}</code>
						{:else if formatted.isStrikethrough}
							<s>{child.text}</s>
						{:else if formatted.isUnderline}
							<u>{child.text}</u>
						{:else}
							{child.text}
						{/if}
					{:else if isLinkNode(child)}
						<a
							href={child.fields?.url || '#'}
							title={child.fields?.url || ''}
							target="_blank"
							class="content-element"
							rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						>
							{#each child.children || [] as linkChild}
								{#if isTextNode(linkChild)}
									{linkChild.text}
								{/if}
							{/each}
						</a>
					{/if}
				{/each}
			</h5>
		{:else}
			<h6 class={className}>
				{#each node.children || [] as child}
					{#if isTextNode(child)}
						{@const formatted = formatText(child)}
						{#if formatted.isBold && formatted.isItalic}
							<strong><em>{child.text}</em></strong>
						{:else if formatted.isBold}
							<strong>{child.text}</strong>
						{:else if formatted.isItalic}
							<em>{child.text}</em>
						{:else if formatted.isCode}
							<code>{child.text}</code>
						{:else if formatted.isStrikethrough}
							<s>{child.text}</s>
						{:else if formatted.isUnderline}
							<u>{child.text}</u>
						{:else}
							{child.text}
						{/if}
					{:else if isLinkNode(child)}
						<a
							href={child.fields?.url || '#'}
							title={child.fields?.url || ''}
							target="_blank"
							class="content-element"
							rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
						>
							{#each child.children || [] as linkChild}
								{#if isTextNode(linkChild)}
									{linkChild.text}
								{/if}
							{/each}
						</a>
					{/if}
				{/each}
			</h6>
		{/if}
	{:else if isParagraphNode(node)}
		{@const hasImage = hasImageChild(node)}

		<p class={hasImage ? 'content-image' : ''}>
			{#each node.children || [] as child}
				{#if isTextNode(child)}
					{@const formatted = formatText(child)}
					{#if formatted.isBold && formatted.isItalic}
						<strong><em>{child.text}</em></strong>
					{:else if formatted.isBold}
						<strong>{child.text}</strong>
					{:else if formatted.isItalic}
						<em>{child.text}</em>
					{:else if formatted.isCode}
						<code>{child.text}</code>
					{:else if formatted.isStrikethrough}
						<s>{child.text}</s>
					{:else if formatted.isUnderline}
						<u>{child.text}</u>
					{:else}
						{child.text}
					{/if}
				{:else if isLinkNode(child)}
					<a
						href={child.fields?.url || '#'}
						title={child.fields?.url || ''}
						target="_blank"
						class="content-element"
						rel={child.fields?.newTab ? 'noopener noreferrer' : undefined}
					>
						{#each child.children || [] as linkChild}
							{#if isTextNode(linkChild)}
								{linkChild.text}
							{/if}
						{/each}
					</a>
				{:else if isUploadNode(child)}
					<img
						src={getImageSrc(child.value?.url || '')}
						alt={child.value?.alt || ''}
						width={child.value?.width}
						class="content-element"
					/>
				{:else if isLineBreakNode(child)}
					<br />
				{/if}
			{/each}
		</p>
	{:else if isUploadNode(node)}
		<img
			src={getImageSrc(node.value?.url || '')}
			alt={node.value?.alt || ''}
			width={node.value?.width}
			class="content-element"
		/>
	{/if}
{/each}
