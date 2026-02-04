<script lang="ts">
	import type { Media } from '$backend/src/payload-types';
	import { PUBLIC_API_URL as media_url } from '$env/static/public';
	import type {
		SerializedParagraphNode,
		SerializedHeadingNode,
		SerializedTextNode,
		SerializedLinkNode,
		SerializedQuoteNode,
		SerializedListNode,
		SerializedListItemNode,
		SerializedHorizontalRuleNode,
		SerializedTableNode,
		SerializedTableCellNode,
		SerializedTableRowNode
	} from '@payloadcms/richtext-lexical';

	import {
		type SerializedEditorState,
		type SerializedLexicalNode
	} from '@payloadcms/richtext-lexical/lexical';

	import RichText from './RichText.svelte';
	import { onDestroy, onMount } from 'svelte';

	interface Props {
		content: SerializedEditorState;
		afterRun?: () => void;
	}

	const { content, afterRun }: Props = $props();

	$inspect(content);

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
		| SerializedQuoteNode
		| SerializedListNode
		| SerializedListItemNode
		| SerializedHorizontalRuleNode
		| SerializedTableNode
		| SerializedTableCellNode
		| SerializedTableRowNode
		| UploadNode
		| SerializedLexicalNode;

	function getHeadingDepth(node: SerializedHeadingNode): number {
		return node.tag ? parseInt(node.tag.replace('h', '')) : 1;
	}

	function getActualDepth(depth: number): number {
		return depth === 1 ? 2 : depth;
	}

	function getHeadingClass(depth: number): string {
		return depth === 1
			? 'heading-3 content-element'
			: `content-element heading-${depth === 6 ? 6 : depth + 1}`;
	}

	function getImageSrc(src: string): string {
		return media_url ? `${media_url}${src}` : src;
	}

	function getAlignmentClass(format?: number | string): string {
		if (!format) return '';
		if (typeof format === 'number') return '';

		const IS_ALIGN_LEFT = 'left';
		const IS_ALIGN_CENTER = 'center';
		const IS_ALIGN_RIGHT = 'right';
		const IS_ALIGN_JUSTIFY = 'justify';
		switch (format) {
			case IS_ALIGN_LEFT:
				return 'align-left';
			case IS_ALIGN_CENTER:
				return 'align-center';
			case IS_ALIGN_RIGHT:
				return 'align-right';
			case IS_ALIGN_JUSTIFY:
				return 'align-justify';
			default:
				return '';
		}

		// Alignment flags in Lexical format
	}

	function formatText(node: SerializedTextNode) {
		const format = node.format || 0;

		return {
			...node,
			isBold: !!(format & 1),
			isItalic: !!(format & 2),
			isStrikethrough: !!(format & 4),
			isCode: !!(format & 16),
			isUnderline: !!(format & 8),
			isSubscript: !!(format & 32),
			isSuperscript: !!(format & 64),
			isHighlight: !!(format & 128)
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

	function isBlockQuoteNode(node: PayloadLexicalNode): node is SerializedQuoteNode {
		return node.type === 'quote';
	}

	function isListNode(node: PayloadLexicalNode): node is SerializedListNode {
		return node.type === 'list';
	}

	function isListItemNode(node: PayloadLexicalNode): node is SerializedListItemNode {
		return node.type === 'listitem';
	}

	function isHorizontalRuleNode(node: PayloadLexicalNode): node is SerializedHorizontalRuleNode {
		return node.type === 'horizontalrule';
	}

	function isTableNode(node: PayloadLexicalNode): node is SerializedTableNode {
		return node.type === 'table';
	}

	function isTableCellNode(node: PayloadLexicalNode): node is SerializedTableCellNode {
		return node.type === 'tablecell';
	}

	function isTableRowNode(node: PayloadLexicalNode): node is SerializedTableRowNode {
		return node.type === 'tablerow';
	}

	function isTableSectionNode(node: PayloadLexicalNode): boolean {
		return node.type === 'thead' || node.type === 'tbody';
	}

	function hasChildren(node: PayloadLexicalNode): boolean {
		return 'children' in node && Array.isArray(node.children) && node.children.length > 0;
	}

	function createInnerContent(node: PayloadLexicalNode): SerializedEditorState {
		return { root: node } as SerializedEditorState;
	}

	const nodes = $derived((content?.root?.children as PayloadLexicalNode[]) || []);

	$inspect(content);

	onMount(() => {
		if (afterRun) {
			afterRun();
		}
	});

	onDestroy(() => {
		if (afterRun) {
			afterRun();
		}
	});
</script>

{#each nodes as node}
	{#if isTextNode(node)}
		{@const formatted = formatText(node)}
		{#if formatted.isBold && formatted.isItalic}
			<strong><em>{node.text}</em></strong>
		{:else if formatted.isBold}
			<strong>{node.text}</strong>
		{:else if formatted.isItalic}
			<em>{node.text}</em>
		{:else if formatted.isCode}
			<code class="content-code-inline">{node.text}</code>
		{:else if formatted.isStrikethrough}
			<s>{node.text}</s>
		{:else if formatted.isUnderline}
			<u>{node.text}</u>
		{:else if formatted.isSubscript}
			<sub>{node.text}</sub>
		{:else if formatted.isSuperscript}
			<sup>{node.text}</sup>
		{:else if formatted.isHighlight}
			<mark>{node.text}</mark>
		{:else}
			{node.text}
		{/if}
	{:else if isHeadingNode(node)}
		{@const depth = getHeadingDepth(node)}
		{@const actualDepth = getActualDepth(depth)}
		{@const className = getHeadingClass(depth)}
		{@const alignClass = getAlignmentClass(node.format)}
		{@const fullClassName = alignClass ? `${className} ${alignClass}` : className}

		{#if actualDepth === 2}
			<h2 class={fullClassName}>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</h2>
		{:else if actualDepth === 3}
			<h3 class={fullClassName}>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</h3>
		{:else if actualDepth === 4}
			<h4 class={fullClassName}>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</h4>
		{:else if actualDepth === 5}
			<h5 class={fullClassName}>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</h5>
		{:else}
			<h6 class={fullClassName}>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</h6>
		{/if}
	{:else if isParagraphNode(node)}
		{@const alignClass = getAlignmentClass(node.format)}
		{@const fullClassName = alignClass ? `content-element ${alignClass}` : 'content-element'}
		<p class={fullClassName}>
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</p>
	{:else if isLinkNode(node)}
		<a
			href={node.fields?.url || '#'}
			title={node.fields?.url || ''}
			target="_blank"
			class="content-link"
			rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
		>
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</a>
	{:else if isUploadNode(node)}
		<img
			src={getImageSrc(node.value?.url || '')}
			alt={node.value?.alt || ''}
			width={node.value?.width}
			class="content-image"
		/>
	{:else if isLineBreakNode(node)}
		<br />
	{:else if isBlockQuoteNode(node)}
		<blockquote class="content-blockquote">
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</blockquote>
	{:else if isHorizontalRuleNode(node)}
		<hr class="content-hr" />
	{:else if isListNode(node)}
		{@const listType = (node as SerializedListNode).listType}
		{@const isChecklist = listType === 'check'}

		{#if (node as SerializedListNode).tag === 'ol'}
			<ol class="content-list">
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</ol>
		{:else if isChecklist}
			<ul class="content-list checklist">
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</ul>
		{:else}
			<ul class="content-list">
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</ul>
		{/if}
	{:else if isListItemNode(node)}
		{@const isChecked = (node as SerializedListItemNode).checked}
		{@const checklistClass =
			isChecked !== undefined
				? isChecked
					? 'content-list-item checklist checklist-toggled'
					: 'content-list-item checklist'
				: 'content-list-item'}

		<li class={checklistClass}>
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</li>
	{:else if isTableNode(node)}
		<table
			class="content-table"
			class:content-table--stripe-row={(node as SerializedTableNode).rowStriping}
		>
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</table>
	{:else if isTableSectionNode(node)}
		{#if (node as PayloadLexicalNode).type === 'thead'}
			<thead class="content-table-head">
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</thead>
		{:else if (node as PayloadLexicalNode).type === 'tbody'}
			<tbody class="content-table-body">
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</tbody>
		{/if}
	{:else if isTableRowNode(node)}
		<tr class="content-table-row">
			{#if hasChildren(node)}
				<RichText content={createInnerContent(node)} />
			{/if}
		</tr>
	{:else if isTableCellNode(node)}
		{#if (node as SerializedTableCellNode).headerState === 1 || (node as SerializedTableCellNode).headerState === 2 || (node as SerializedTableCellNode).headerState === 3}
			<th
				class="content-table-cell content-table-cell-head"
				class:content-table-cell-heading--1={(node as SerializedTableCellNode).headerState === 1}
				class:content-table-cell-heading--2={(node as SerializedTableCellNode).headerState === 2}
				class:content-table-cell-heading--3={(node as SerializedTableCellNode).headerState === 3}
				colspan={(node as SerializedTableCellNode).colSpan || 1}
				rowspan={(node as SerializedTableCellNode).rowSpan || 1}
			>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</th>
		{:else}
			<td
				class="content-table-cell"
				colspan={(node as SerializedTableCellNode).colSpan || 1}
				rowspan={(node as SerializedTableCellNode).rowSpan || 1}
			>
				{#if hasChildren(node)}
					<RichText content={createInnerContent(node)} />
				{/if}
			</td>
		{/if}
	{/if}
{/each}
